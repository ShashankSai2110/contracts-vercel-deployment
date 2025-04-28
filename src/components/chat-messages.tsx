"use client";

import { useEffect, useRef } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useStore } from "@/lib/useStore";

type Message = {
  role: "user" | "system";
  content: string;
};

type ChatMessagesProps = {
  messages: Message[];
};

export default function ChatMessages({ messages }: ChatMessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { botLoading } = useStore();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="h-full space-y-4 pr-2 mt-5">
      {messages.map((msg, idx) => (
        <div
          key={idx}
          className={`flex items-end gap-2 ${
            msg.role === "user" ? "justify-end" : "justify-start"
          }`}
        >
          {msg.role !== "user" && <div className="text-xl">🤖</div>}
          <div
            className={`rounded-lg px-4 py-2 max-w-xs ${
              msg.role === "user"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
          </div>
          {msg.role === "user" && <div className="text-xl">👤</div>}
        </div>
      ))}

      {botLoading && (
        <div className="flex items-end gap-2 justify-start">
          <div className="text-xl">🤖</div>
          <div className="rounded-lg px-4 py-2 max-w-xs bg-gray-200 text-gray-800 flex items-center justify-center">
            <ThreeDots
              visible={true}
              height="30"
              width="50"
              color="#9C27B0"
              radius="9"
              ariaLabel="three-dots-loading"
            />
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />
    </div>
  );
}
