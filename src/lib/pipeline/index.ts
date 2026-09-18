import { getSeed } from "../seed";
import { runIngest } from "./ingest";
import { runCluster } from "./cluster";
import { runCompare } from "./compare";
import { runBriefOffline } from "./brief";
import type {
  BriefResult,
  ClusterResult,
  CompareResult,
  IngestResult,
} from "../types";

export { runIngest, runCluster, runCompare, runBriefOffline };
export { buildBriefPrompt } from "./brief";

export function runFullOfflinePipeline(): {
  ingest: IngestResult;
  cluster: ClusterResult;
  compare: CompareResult;
  brief: BriefResult;
} {
  const seed = getSeed();
  return {
    ingest: runIngest(seed),
    cluster: runCluster(seed),
    compare: runCompare(seed),
    brief: runBriefOffline(seed),
  };
}
