import { Bee, BeeDebug } from "@ethersphere/bee-js";

export const bee = new Bee(process.env.BEE_NODE_URL || "http://localhost:1633");

export const beeDebug = new BeeDebug(
  process.env.BEE_NODE_DEBUG_URL || "http://localhost:1635"
);
