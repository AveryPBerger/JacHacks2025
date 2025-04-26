import postgres from "postgres";
import Router from "../router/Router";
import Request from "../router/Request";
import Response, { StatusCode } from "../router/Response";
import Utility from "../models/Utility";
import ActionsTaken, { ActionsTakenProps } from "../models/ActionsTaken";

export default class ActionsTakenController{
    private sql: postgres.Sql<any>;

    constructor(sql: postgres.Sql<any>) {
        this.sql = sql;

    }

    registerRoutes(router: Router) {
        // Any routes that include a `:id` parameter should be registered last.
        router.get("/ActionsTaken/", this.getActionsTaken);
    }

    getActionsTaken = async (req: Request, res: Response) => {
		const queryParams = req.getSearchParams();

		
		let action: ActionsTaken[] = [];
  
		
		try {
			action = await ActionsTaken.readAll(
				this.sql,
			);
		} catch (error) {
			const message = `Error while getting action list: ${error}`;
			console.error(message);
			await res.send({
				statusCode: StatusCode.InternalServerError,
				message,
			});
		}

		await res.send({
			statusCode: StatusCode.OK,
			message: "Action list retrieved",
			payload: {
				todos: action.map((action) => action.props),
			},
		});
	};
}