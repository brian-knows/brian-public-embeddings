import { createClient } from "@libsql/client";

export const getTursoClient = () => {
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (!authToken) return null;

  return createClient({
    url: process.env.TURSO_DB as string,
    authToken,
  });
};
