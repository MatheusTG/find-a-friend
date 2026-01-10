import fastify from "fastify";
import { orgsRoutes } from "./modules/orgs/orgs.routes";

const app = fastify();

app.register(orgsRoutes);

try {
  await app.listen({ port: 3333, host: "0.0.0.0" });
  console.log("HTTP Server Running!");
} catch (err) {
  console.error("Error when uploading server: ", err);
  process.exit(1);
}
