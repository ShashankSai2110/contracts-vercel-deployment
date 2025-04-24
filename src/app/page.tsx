"use client";

import Sidebar from "@/components/sidebar";
import FileUpload from "@/components/file-upload";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import { Loader } from "lucide-react";
import { useStore } from "@/lib/useStore";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import WebSocketLoaders from "@/components/web-socket-loaders";

export default function Home() {
  const { user, messages, socketState, uploadedFiles } = useStore();

  return (
    <div className="relative flex h-screen w-full bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500">
      <Sidebar />

      <main className="flex-1 relative h-screen">
        {/* Grey background container */}
        <div className="absolute top-5 left-5 bottom-5 right-5 bg-gray-300 rounded-xl z-0 transition-all duration-500" />
        {socketState === "done" && (
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute top-5 bottom-5 left-[78%] w-[22%] z-10 overflow-auto p-4 space-y-2"
          >
            <h3 className="text-lg font-semibold text-gray-800">
              Uploaded Files
            </h3>
            {uploadedFiles.map((file) => (
              <motion.div
                key={file.file.name}
                layoutId={file.file.name}
                className="text-sm truncate text-gray-700 bg-white/60 rounded-md px-3 py-1 shadow-sm"
              >
                {file.file.name}
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* White foreground box */}
        <div
          className={`absolute transition-all duration-500 z-10 ${
            socketState === "done"
              ? "top-[5%] left-[5%] right-[23%] bottom-[5%]"
              : "inset-5"
          }`}
        >
          <div className="bg-white rounded-xl shadow-xl w-full h-full flex flex-col">
            <div className="p-8 flex flex-1 overflow-hidden">
              {/* Left Side - Chat + Upload */}
              <div className="flex flex-col overflow-hidden w-full transition-all duration-500">
                <div className="flex justify-center items-center mb-4">
                  <h1 className="text-2xl font-medium">
                    Welcome back, <span className="text-red-500">{user}</span>
                  </h1>
                </div>

                {socketState !== "done" && (
                  <div className="flex-1 flex flex-col">
                    <div className="flex-1 overflow-y-auto">
                      <FileUpload />
                    </div>
                  </div>
                )}
                {socketState !== "done" && <WebSocketLoaders />}

                {/* Chat Messages */}
                <div className="flex-1 min-h-0 overflow-hidden">
                  <ChatMessages messages={messages} />
                </div>

                {/* Chat Input */}
                <div className="mt-4 flex-shrink-0">
                  <ChatInput />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
