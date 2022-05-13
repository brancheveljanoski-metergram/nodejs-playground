import { createConnection, getConnection, Connection, ConnectionOptions } from "typeorm";
import { Movie } from "../database/entities"

export const dbConfig: ConnectionOptions = {
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
};

export class DatabaseConnection {
    constructor() { }
    private async tryGetExistingConnection(): Promise<Connection | null> {
        try {
            const connection = getConnection();
            if (!connection.isConnected) {
                return connection.connect();
            }
            return connection;
        } catch (e) {
            return null;
        }
    }
    async getEntityManager() {
        const existingConnection = await this.tryGetExistingConnection();
        if (existingConnection) {
            return existingConnection.createEntityManager();
        }
        const connection = await createConnection(dbConfig);
        return connection.createEntityManager();
    }
}