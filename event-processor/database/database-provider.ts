import {
    Container,
    CosmosClient
} from "@azure/cosmos";

export class DatabaseProvider {
    private _client: CosmosClient;

    constructor() {
        const dbUrl = process.env.CosmosDbUrl;
        const dbKey = process.env.CosmosDbKey;

        this._client = new CosmosClient({
            endpoint: dbUrl,
            key: dbKey,
            consistencyLevel: "Session"
        });
    }

    getDatabase(): Container {
        const db = this._client.database("ReportingDb");
        return db.container("ReportingDb");
    }
}
