import { Client } from "typesense";

const { TYPESENSE_HOST = "localhost", TYPESENSE_PORT = 8108, TYPESENSE_API_KEY = "99JZY2d6LCclb7MGRcSDpw9z5jXFKWpw" } = process.env;

export const tsClient = new Client({
    nodes: [{ host: TYPESENSE_HOST, port: Number(TYPESENSE_PORT), protocol: "http" }],
    apiKey: TYPESENSE_API_KEY,
    connectionTimeoutSeconds: 2,
});
