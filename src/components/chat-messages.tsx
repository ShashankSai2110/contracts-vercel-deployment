"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const prevLengthRef = useRef<number>(0);
  const { botLoading } = useStore();

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    prevLengthRef.current = messages.length;
  }, [messages]);

  return (
    <div className="h-full overflow-y-auto space-y-4 pr-2 mt-5">
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => {
          const isNew =
            idx === messages.length - 1 &&
            messages.length > prevLengthRef.current;

          return (
            <motion.div
              key={idx}
              initial={isNew ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
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
            </motion.div>
          );
        })}

        {/* Loading Spinner as a fake "system message" */}
        {botLoading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-end gap-2 justify-start"
          >
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
          </motion.div>
        )}
      </AnimatePresence>

      <div ref={messagesEndRef} />
    </div>
  );
}
