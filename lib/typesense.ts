import { Client } from "typesense";

export const tsClient = new Client({
  nodes: [{ host: "localhost", port: 8108, protocol: "http" }],
  apiKey: "TYPESENSE",
  connectionTimeoutSeconds: 2,
});
