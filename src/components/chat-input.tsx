"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { SendHorizontal } from "lucide-react";
import ContractQuestions from "./contract-questions";
import { apiRequest } from "@/network/apis";
import constants from "@/lib/constants";
import { useStore } from "@/lib/useStore";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const {
    setQuestions,
    messages,
    setMessages,
    setBotLoading,
    sessionId,
    isFileUploaded,
  } = useStore();
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();

      if (!isFileUploaded) {
        setErrorMessage("Please upload a file before sending your message.");
        return;
      }

      if (message.trim()) {
        let msg = message;
        let requestBody = {
          message: msg,
          session_id: sessionId.toString(),
        };

        setBotLoading(true);
        setMessages([...messages, { role: "user", content: message }]);
        setMessage("");

        const response = await apiRequest<Message[]>(
          constants.ASK_CUSTOM_QUESTION,
          "POST",
          requestBody
        );

        if (response.ok && response.data) {
          setMessages(response.data);
          setBotLoading(false);
        }
      }
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (isFileUploaded) {
      setErrorMessage("");
    }

    const fetchData = async () => {
      try {
        // Get employee details using the numeric id
        const questions = await apiRequest<Question[]>(
          constants.GET_QUESTIONS,
          "GET"
        );

        if (questions.ok && questions.data) {
          setQuestions(questions.data);
        }
      } catch (error) {
      } finally {
      }
    };

    fetchData();
  }, [isFileUploaded]);

  return (
    <>
      <div className="flex justify-center items-center mb-4 italic">
        {errorMessage && (
          <div className="mt-2 text-sm bg-gradient-to-r from-[#D62976] via-[#EB3D53] to-[#ED6B36] bg-clip-text text-transparent">
            {errorMessage}
          </div>
        )}
      </div>

      <div className="mt-5">
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="How can I help?"
            rows={6}
            className="w-full border border-gray-300 rounded-lg py-4 px-4 pr-12 focus:outline-none resize-none"
          />
          <button
            type="submit"
            className="absolute bottom-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <SendHorizontal
              className={`h-6 w-6 ${
                !isFileUploaded ? "text-[#A7A5A6]" : "text-[#9E1F63]"
              }`}
            />
          </button>
        </form>

        <div className="mt-2">
          <ContractQuestions />
        </div>
      </div>
    </>
  );
}
