import { Client } from "typesense";

export const tsClient = new Client({
  nodes: [{ host: "typesense", port: 8108, protocol: "http" }],
  apiKey: "TYPESENSE",
  connectionTimeoutSeconds: 2,
});
