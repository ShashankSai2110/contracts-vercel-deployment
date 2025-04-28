import { create } from "zustand";

export const useStore = create<CounterState>((set, get) => ({
  user: "Vivishiek",
  messages: [],
  loading: false,
  questions: [],
  botLoading: false,
  socketState: null,
  isFileUploaded: false,
  setIsFileUploaded: (isFileUploaded: boolean) => set({ isFileUploaded }),
  setLoading: (loading) => set({ loading }),
  sessionId: Math.floor(Math.random() * 1000000),
  setBotLoading: (loading) => set({ botLoading: loading }),
  setMessages: (newMessages) => set({ messages: newMessages }),
  setQuestions: (newQuestions) => set({ questions: newQuestions }),
  setSocketState: (socketState: SocketState) => set({ socketState }),
}));
