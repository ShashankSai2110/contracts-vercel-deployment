import { WS_URL, API_URL } from "@/config";

export default {
  API_URL: API_URL,
  WS_URL: WS_URL,
  ASK_CUSTOM_QUESTION: "/chat/ask_custom_question",
  EMBED_DOCUMENTS: "/chat/embed_documents",
  ASK_PREDEFINED_QUESTION: "/chat/question/{question_id}",
  GET_QUESTIONS: "/questions",
  UPLOAD_FILE: "/files",
  CATEGORIES: {
    CONTRACT: "contract",
    SUPPORTING_DOCUMENT: "supportingDocument"
  }
};