import dotenv from "dotenv";

dotenv.config();

import { Cron } from "croner";
import { bee, beeDebug, chroma, getTursoClient } from "./lib";
import { IncludeEnum } from "chromadb";

// load cron schedule from environment variable or default is once a month
const CRON_SCHEDULE = process.env.CRON_SCHEDULE || "0 0 1 * *";

const publishEmbeddingsFunction = async () => {
  console.log(`⚡️ [${new Date().toISOString()}] Job started.`);

  const publicCollection = await chroma.getCollection({
    name: "public-knowledge-box",
  });

  console.log(`📦 [${new Date().toISOString()}] Fetching embeddings...`);
  const { embeddings } = await publicCollection.get({
    include: [IncludeEnum.Embeddings],
  });

  if (embeddings) {
    const filename = `embeddings-${Date.now()}.json`;
    // 12856320000 is = 31 days in milliseconds times (21000 / 5)
    const postageBatchId = await beeDebug.createPostageBatch("12856320000", 20);
    console.log(
      `📦 [${new Date().toISOString()}] Uploading embeddings to Swarm...`
    );

    const jsonFileArray = new TextEncoder().encode(
      JSON.stringify({ embeddings })
    );

    const result = await bee.uploadFile(
      postageBatchId,
      jsonFileArray,
      filename,
      {
        pin: true,
      }
    );

    const { reference } = result;
    console.log(`✅ Embeddings uploaded to Swarm. Reference: ${reference}`);

    if (process.env.TURSO_DB) {
      const turso = getTursoClient();
      if (turso) {
        console.log(
          `📦 [${new Date().toISOString()}] Storing reference in Turso...`
        );
        const operations = [
          "CREATE TABLE IF NOT EXISTS embeddings_files (id INTEGER PRIMARY KEY, value TEXT, timestamp TEXT)",
          `INSERT INTO embeddings_files (id, value, timestamp) VALUES (NULL, '${reference}', '${new Date().toISOString()}')`,
        ];
        await turso.batch(operations, "write");
        console.log(`✅ Reference stored in Turso.`);
        return;
      }
    }
  }

  console.log(`❌ No embeddings found. Exiting...`);
};

const publishEmbeddingsJob = new Cron(
  CRON_SCHEDULE as string,
  publishEmbeddingsFunction
);

if (process.env.DEBUG) {
  publishEmbeddingsFunction();
}
