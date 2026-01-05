import fastify from "fastify";

const app = fastify();

try {
  await app.listen({ port: 3000, host: "0.0.0.0" });
  console.log("HTTP Server Running!");
} catch (err) {
  console.error("Error when uploading server: ", err);
  process.exit(1);
}
