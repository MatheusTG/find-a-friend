import { createApp } from "./app";
import { env } from "./env";

async function start() {
  const app = await createApp();

  try {
    await app.listen({ port: env.PORT, host: "0.0.0.0" });
    app.log.info("🚀 HTTP server running");
  } catch (err) {
    app.log.error(err, "Error while starting server");
    process.exit(1);
  }
}

await start();
