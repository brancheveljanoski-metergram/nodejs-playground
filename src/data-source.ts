import "reflect-metadata"
import { DataSource } from "typeorm"
import { Movie } from "./entity/Movie"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres123",
    database: "postgres",
    synchronize: true,
    logging: false,
    entities: [Movie],
    migrations: [],
    subscribers: [],
})
