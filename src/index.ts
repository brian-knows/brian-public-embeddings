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
    const filename = `embeddings-${Date.now()}`;
    // 12856320000 is = 31 days in milliseconds times (21000 / 5)
    const postageBatchId = await beeDebug.createPostageBatch("12856320000", 24);
    console.log(
      `📦 [${new Date().toISOString()}] Uploading embeddings to Swarm...`
    );
    const result = await bee.uploadFile(
      postageBatchId,
      JSON.stringify({ embeddings }),
      filename,
      { pin: true }
    );
    const cid = result.cid();
    console.log(`✅ Embeddings uploaded to Swarm. CID: ${cid}`);

    const turso = getTursoClient();
    if (turso) {
      console.log(`📦 [${new Date().toISOString()}] Storing CID in Turso...`);
      const operations = [
        "CREATE TABLE IF NOT EXISTS cids (cid TEXT, timestamp TEXT)",
        `INSERT INTO cids (cid, timestamp) VALUES ('${cid}', '${new Date().toISOString()}')`,
      ];
      await turso.batch(operations, "write");
      console.log(`✅ CID stored in Turso.`);
      return;
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
