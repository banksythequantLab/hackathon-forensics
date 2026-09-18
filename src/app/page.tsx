import { ForensicsApp } from "@/components/ForensicsApp";
import { runFullOfflinePipeline } from "@/lib/pipeline";
import { getSeed } from "@/lib/seed";

export default function HomePage() {
  const pipeline = runFullOfflinePipeline();
  const seed = getSeed();

  return (
    <ForensicsApp
      ingest={pipeline.ingest}
      cluster={pipeline.cluster}
      compare={pipeline.compare}
      brief={pipeline.brief}
      modelMap={seed.model_map}
      target={seed.target_hackathon}
    />
  );
}
