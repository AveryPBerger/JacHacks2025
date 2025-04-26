import postgres from "postgres";
import Router from "../router/Router";
import Request from "../router/Request";
import Response, { StatusCode } from "../router/Response";
import Utility from "../models/Utility";

export default class UtilityController{
    private sql: postgres.Sql<any>;

	constructor(sql: postgres.Sql<any>) {
		this.sql = sql;

	}

    registerRoutes(router: Router) {
		// Any routes that include a `:id` parameter should be registered last.
		router.get("/utility/:id", this.getTodo);
	}

	getTodo = async (req: Request, res: Response) => {
		const id = req.getId()

		if (isNaN(id)) {
			await res.send({
				statusCode: StatusCode.BadRequest,
				message: "Invalid ID",
			});
			return;
		}

		let utility: Utility | null = null;

		try {
			utility = await Utility.read(this.sql, id);
		} catch (error) {
			const message = `Error while getting utility: ${error}`;
			console.error(message);
			await res.send({
				statusCode: StatusCode.InternalServerError,
				message,
			});
		}

		if (utility) {
			await res.send({
				statusCode: StatusCode.OK,
				message: "Utility retrieved",
				payload: { utility: utility.props },
			});
		} else {
			await res.send({
				statusCode: StatusCode.NotFound,
				message: "Not found",
			});
		}
	};

}