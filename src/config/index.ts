export const API_URL = "http://localhost:8000/api/v1";
export const WS_URL = `ws://localhost:8000/api/v1/chat/embed_documents`; 
export const CATEGORIES = {
  CONTRACT: "contract",
  SUPPORTING_DOCUMENT: "supportingDocument"
};

export const ENDPOINTS = {
  ASK_CUSTOM_QUESTION: "/chat/ask_custom_question",
  EMBED_DOCUMENTS: "/chat/embed_documents",
  ASK_PREDEFINED_QUESTION: "/chat/question/{question_id}",
  GET_QUESTIONS: "/questions",
  UPLOAD_FILE: "/files"
};
