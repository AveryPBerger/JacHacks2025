import postgres from "postgres";
import Router from "../router/Router";
import Request from "../router/Request";
import Response, { StatusCode } from "../router/Response";
import Utility from "../models/Utility";

export default class UtilityController {
    private sql: postgres.Sql<any>;

    constructor(sql: postgres.Sql<any>) {
        this.sql = sql;
    }

    registerRoutes(router: Router) {
        // Any routes that include a `:id` parameter should be registered last.
        router.get("/utility/:id", this.getUtility);
    }

    getUtility = async (req: Request, res: Response) => {
        console.log("I'VE BEEN HIT");
        const id = req.getId();

        // Set content type header to ensure JSON response
        res.setHeader('Content-Type', 'application/json');

        if (isNaN(id)) {
            await res.send({
                statusCode: StatusCode.BadRequest,
                message: "Invalid ID",
                success: false
            });
            return;
        }

        let utility: Utility | null = null;

        try {
            utility = await Utility.read(this.sql, id);
            
            if (utility) {
                await res.send({
                    statusCode: StatusCode.OK,
                    message: "Utility retrieved",
                    payload: { utility: utility.props },
                    success: true
                });
            } else {
                await res.send({
                    statusCode: StatusCode.NotFound,
                    message: "Not found",
                    success: false
                });
            }
        } catch (error) {
            const message = `Error while getting utility: ${error}`;
            console.error(message);
            await res.send({
                statusCode: StatusCode.InternalServerError,
                message,
                success: false
            });
            return;
        }
    };
}