"use client";

import { Plus } from "lucide-react";
import { useStore } from "@/lib/useStore";
import { apiRequest } from "@/network/apis";
import constants from "@/lib/constants";

export default function ContractQuestions() {
  const { questions, setMessages, messages, setBotLoading, sessionId } = useStore();

  const askPredefinedQuestion = async (question: Question) => {
    try {
      setMessages([...messages, { role: "user", content: question.question }]);
      setBotLoading(true);
      const requestBody = {
        question_id: question.id,
        session_id: sessionId,
      };
      // Get employee details using the numeric id
      const response = await apiRequest<Message[]>(
        constants.ASK_PREDEFINED_QUESTION.replace(
          "{question_id}",
          question.id.toString()
        ),
        "POST",
        requestBody
      );

      if (response.ok && response.data) {
        setMessages(response.data);
        setBotLoading(false);
      }
    } catch (error) {
    } finally {
    }
  };

  return (
    <div className="grid grid-cols-2 gap-1">
      {questions.map((q) => (
        <button
          key={q.id}
          className="flex items-center justify-between text-left border border-gray-200 rounded-lg p-3 hover:bg-gray-50"
          onClick={() => {
            askPredefinedQuestion(q);
          }}
        >
          <span className="text-sm text-gray-600">{q.question}</span>
          <Plus className="h-4 w-4 text-gray-400" />
        </button>
      ))}
    </div>
  );
}
