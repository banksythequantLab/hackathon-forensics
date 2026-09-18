import seedJson from "../../data/seed.json";
import type { SeedData } from "./types";

export const seed = seedJson as SeedData;

export function getSeed(): SeedData {
  return seed;
}
