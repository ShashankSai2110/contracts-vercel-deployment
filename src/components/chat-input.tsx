"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Send, SendHorizontal } from "lucide-react";
import ContractQuestions from "./contract-questions";
import { apiRequest } from "@/network/apis";
import constants from "@/lib/constants";
import { useStore } from "@/lib/useStore";

export default function ChatInput() {
  const [message, setMessage] = useState("");
  const { setQuestions, messages, setMessages, setBotLoading, sessionId } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      if (message.trim()) {
        let msg = message;
        let requestBody = {
          message: msg,
          session_id: sessionId,
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
  }, []);

  return (
    <div className="mt-5">
      <form onSubmit={handleSubmit} className="relative">
      <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can I help?"
          rows={6}
          className="w-full border border-gray-300 rounded-lg py-4 px-4 pr-12 focus:outline-none resize-none"
        />
        <button
          type="submit"
          className="absolute bottom-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <SendHorizontal className="h-6 w-6" />
        </button>
      </form>

      <div className="mt-2">
        <ContractQuestions />
      </div>
    </div>
  );
}
