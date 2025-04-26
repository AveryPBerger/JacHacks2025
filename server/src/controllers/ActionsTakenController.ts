import postgres from "postgres";
import Router from "../router/Router";
import Request from "../router/Request";
import Response, { StatusCode } from "../router/Response";
import Utility, { UtilityProps } from "../models/Utility";
import ActionsTaken, { ActionsTakenProps } from "../models/ActionsTaken";
import { util } from "prettier";

export default class ActionsTakenController{
    private sql: postgres.Sql<any>;

    constructor(sql: postgres.Sql<any>) {
        this.sql = sql;

    }

    registerRoutes(router: Router) {
        // Any routes that include a `:id` parameter should be registered last.
        router.get("/ActionsTaken/", this.getActionsTaken);
        router.post("/ActionsTaken/:id", this);
    }


    createTodo = async (req: Request, res: Response) => {

        const id = req.getId();

		let action: ActionsTaken | null = null;
		

        let utility = await Utility.read(this.sql,id)
        
        let actionProps: ActionsTakenProps = {
            utilityId: utility!.props.utilityId,
            timeTaken: new Date()
		};

		
		try {
			action = await ActionsTaken.create(this.sql, actionProps);
		} catch (error) {
			console.error("Error while creating action:", error);
		}

		if (!action) {
			await res.send({
				statusCode: StatusCode.InternalServerError,
				message: "Error while creating action",
			});
			return;
		}

		await res.send({
			statusCode: StatusCode.Created,
			message: "Action created successfully!",
			payload: { action: action.props },
		});
	};

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