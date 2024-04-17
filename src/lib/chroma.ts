import { ChromaClient } from "chromadb";

export const chroma = new ChromaClient({
  path: process.env.CHROMA_NODE_URL || "http://localhost:8000",
});
