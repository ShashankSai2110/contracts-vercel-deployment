"use client";
import { useStore } from "@/lib/useStore";
import { useRef } from "react";
import { FallingLines, DNA, Blocks } from "react-loader-spinner";

export default function WebSocketLoaders({ isUploadComplete }: { isUploadComplete: boolean }) {
  const socketRef = useRef<WebSocket | null>(null);
  const { socketState, setSocketState, sessionId } = useStore();

  // Replace this with actual session ID from cookies, context, or props

  const onPress = () => {
    const wsUrl = `ws://localhost:8000/api/v1/chat/embed_documents?session_id=${sessionId}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("WebSocket message:", message);

      if (["chunking", "embedding", "saving"].includes(message.status)) {
        setSocketState(message.status as any);
      }

      if (message.status === "done") {
        setSocketState("done");
        socketRef.current?.close();
      }
    };

    socketRef.current.onerror = (e) => {
      console.error("WebSocket error", e);
    };
  };

  if (!socketState && isUploadComplete)
    return (
      <div className="flex justify-center mt-3">
        <button
          onClick={onPress}
          className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Process Files
        </button>
      </div>
    );

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
