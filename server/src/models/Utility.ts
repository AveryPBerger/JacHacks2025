import postgres from "postgres";


export interface UtilityProps {
	utilityId: number,
    name: string,
    cost?: number, 
    waterCost: number, 
    description: string,
}

export default class Utility {
	constructor(
		private sql: postgres.Sql<any>,
		public props: UtilityProps,
	) {}

	static async read(sql: postgres.Sql<any>, id: number) {
		const connection = await sql.reserve();

		const [row] = await connection<UtilityProps[]>`
			SELECT * FROM
			Utility WHERE id = ${id}
		`;

		await connection.release();

		if (!row) {
			return null;
		}

		return new Utility(sql,  row as UtilityProps);
	}
}
