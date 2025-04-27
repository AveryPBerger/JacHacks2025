import http, { IncomingMessage, ServerResponse } from "http";
import fs from "fs/promises";
import postgres from "postgres";

import Router from "./router/Router";
import Request from "./router/Request";
import Response, { StatusCode } from "./router/Response";

import UtilityController from "./controllers/UtilityControler";
import ActionsTakenController from "./controllers/ActionsTakenController";

import path from "path";

export interface ServerOptions {
	host: string;
	port: number;
	sql: postgres.Sql<any>;
}

export default class Server {
	private host: string;
	private port: number;
	private server: http.Server;
	private sql: postgres.Sql<any>;
	private router: Router;
	private utilityController: UtilityController;
	private actionsTakenController: ActionsTakenController;

	constructor(serverOptions: ServerOptions) {
		this.server = http.createServer();
		this.sql = serverOptions.sql;
		this.host = serverOptions.host;
		this.port = serverOptions.port;

		this.router = new Router();

		this.utilityController = new UtilityController(this.sql);
		this.utilityController.registerRoutes(this.router);

		this.actionsTakenController = new ActionsTakenController(this.sql);
		this.actionsTakenController.registerRoutes(this.router);

		// Register home page route
		this.router.get("/", (req: Request, res: Response) => {
			res.send({
				statusCode: StatusCode.OK,
				message: "Welcome to WaterWaster!",
				template: "HomeView",
				payload: {
					title: "Water Waster Game",
					features: [
						{ title: "Utility Management", description: "Manage utilities and track water consumption." },
						{ title: "Real-time Actions", description: "Record actions taken by players instantly." },
						{ title: "Postgres Backend", description: "Reliable data storage for all player interactions." },
					],
				},
			});
		});
	}

	// Method to load init.sql file
	private loadInitSql = async () => {
		try {
			const initSql = await fs.readFile("../.devcontainer/init.sql", "utf-8"); // Change path to your init.sql file
			await this.sql.unsafe(initSql);  // Execute the SQL commands from the file
			console.log("Database initialized with init.sql.");
		} catch (error) {
			console.error("Error loading init.sql:", error);
			this.stop();
		}
	};

	handleRequest = async (req: IncomingMessage, res: ServerResponse) => {
		console.log(`>>> ${req.method} ${req.url}`);

		const request = new Request(req);
		const response = new Response(request, res);

		if (!req.method || !req.url) {
			await response.send({
				statusCode: StatusCode.BadRequest,
				message: "Invalid request",
			});
			return;
		}

		if (req.method === "OPTIONS") {
			await response.send({
				statusCode: StatusCode.OK,
				message: "",
			});
			return;
		}

		if (req.url.match(/.*\..*/)) {
			await this.serveStaticFile(req.url, res);
			return;
		}

		if (req.method === "POST" || req.method === "PUT") {
			await request.parseBody();
		}

		const handler = this.router.findMatchingHandler(request.getMethod(), req.url);

		if (!handler) {
			await response.send({
				statusCode: StatusCode.NotFound,
				message: `Invalid route: ${req.method} ${req.url}`,
			});
			return;
		}

		try {
			await handler(request, response);
		} catch (error) {
			console.error("Error while handling request:", error);
			await response.send({
				statusCode: StatusCode.InternalServerError,
				message: "Server error occurred",
			});
		}
	};

	serveStaticFile = async (url: string, res: ServerResponse) => {
		try {
			const filePath = `.${url}`;
			const file = await fs.readFile(filePath);
			res.end(file);
		} catch (error) {
			console.error("Static file not found:", url);
			res.statusCode = 404;
			res.end("File not found");
		}
	};

	start = async () => {
		// Load init.sql before starting the server
		//await this.initializeDatabase();
		//await this.loadInitSql();

		this.server.on("request", this.handleRequest);
		await this.server.listen(this.port);
		console.log(`Server running at http://${this.host}:${this.port}/`);
	};

	stop = async () => {
		await this.sql.end();
		this.server.close();
		console.log(`Server stopped.`);
	};

	private initializeDatabase = async () => {
		try {
			// Connect to the default 'postgres' database
			const defaultSql = postgres({ database: "postgres" });
	
			// Load and execute the init.sql script
			const filePath = path.resolve(__dirname, "../../.devcontainer/init.sql");
			const initSql = await fs.readFile(filePath, "utf-8");
			await defaultSql.unsafe(initSql);
	
			console.log("Database initialized with init.sql.");
	
			// Close the default connection and reconnect to the 'WaterWaster' database
			await defaultSql.end();
			this.sql = postgres({ database: "WaterWaster" });
		} catch (error) {
			console.error("Error initializing database:", error);
			this.stop();
		}
	};
}
