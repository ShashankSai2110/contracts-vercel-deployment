"use client";
import { useStore } from "@/lib/useStore";
import { FallingLines, DNA, Blocks } from "react-loader-spinner";

export default function WebSocketLoaders() {
  const { socketState } = useStore();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {socketState === "chunking" && (
        <>
          <FallingLines color="#9C27B0" width="100" visible={true} />
          <p className="mt-4 text-sm text-gray-700">Chunking documents...</p>
        </>
      )}
      {socketState === "embedding" && (
        <>
          <DNA
            visible={true}
            height="100"
            width="100"
            ariaLabel="dna-loading"
            wrapperClass="dna-wrapper"
          />
          <p className="mt-4 text-sm text-gray-700">Creating embeddings...</p>
        </>
      )}
      {socketState === "saving" && (
        <>
          <Blocks
            visible={true}
            height="100"
            width="100"
            ariaLabel="blocks-loading"
            color="#9C27B0"
          />
          <p className="mt-4 text-sm text-gray-700">
            Saving to vector database...
          </p>
        </>
      )}
    </div>
  );
}
