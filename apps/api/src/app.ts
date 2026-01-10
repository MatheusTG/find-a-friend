import fastify from "fastify";
import { orgsRoutes } from "./modules/orgs/orgs.routes";

export const app = fastify();

app.register(orgsRoutes);
