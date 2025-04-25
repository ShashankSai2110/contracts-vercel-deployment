"use client";

import { Plus } from "lucide-react";
import { useStore } from "@/lib/useStore";
import { apiRequest } from "@/network/apis";
import constants from "@/lib/constants";

export default function ContractQuestions() {
  const { questions, setMessages, messages, setBotLoading, sessionId, isFileUploaded } =
    useStore();

  const askPredefinedQuestion = async (question: Question) => {
    try {
      setMessages([...messages, { role: "user", content: question.question }]);
      setBotLoading(true);
      const requestBody = {
        question_id: question.id,
        session_id: sessionId.toString(),
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
        className={`flex items-center gap-2 cursor-pointer text-left p-3 ${
          !isFileUploaded ? "cursor-not-allowed opacity-50" : ""
        }`}
        onClick={() => {
          if (isFileUploaded) {
            askPredefinedQuestion(q);
          }
        }}
        disabled={!isFileUploaded} 
      >
          <Plus className={`h-4 w-4 ${
          !isFileUploaded ? "text-[#A7A5A6]" : "text-[#9E1F63]"
        }`} />
          <span className={`text-sm ${
          !isFileUploaded ? "text-[#A7A5A6]" : "text-[#000E14]"
        }`}>{q.question}</span>
          
        </button>
      ))}
    </div>
  );
}
