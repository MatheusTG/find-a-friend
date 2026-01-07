import fastify from "fastify";

const app = fastify();

app.get("/", async (request, reply) => {
  return reply.send("Hello World!!!");
});

try {
  await app.listen({ port: 3333, host: "0.0.0.0" });
  console.log("HTTP Server Running!");
} catch (err) {
  console.error("Error when uploading server: ", err);
  process.exit(1);
}
