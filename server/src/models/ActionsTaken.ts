import postgres from "postgres";


export interface ActionsTakenProps {
    utilityId: number,
    timeTaken: Date,
}

export default class ActionsTaken {
    constructor(
        private sql: postgres.Sql<any>,
        public props: ActionsTakenProps,
    ) {}


    static async create(sql: postgres.Sql<any>, props: ActionsTakenProps) {
		const connection = await sql.reserve();

		props.timeTaken = props.timeTaken ?? Date.now();

		const [row] = await connection<ActionsTakenProps[]>`
			INSERT INTO todos
				${sql(props)}
			RETURNING *
		`;

		await connection.release();

		return new ActionsTaken(sql, row as ActionsTakenProps);
	}


    static async readAll(
		sql: postgres.Sql<any>,
	): Promise<ActionsTaken[]> {
		const connection = await sql.reserve();

    	const rows = await connection<ActionsTakenProps[]>`
			SELECT *
			FROM actionsTaken
		`;

		await connection.release();

		return rows.map(
			(row) =>
				new ActionsTaken(sql, row as ActionsTakenProps),
		);
    }


}
