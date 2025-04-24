type Message = {
  role: "user" | "system";
  content: string;
};

type Question = {
  id: number;
  question: string;
};

type SocketState = "chunking" | "embedding" | "saving" | "done" | null;

type FileWithProgress = {
  file: File;
  progress: number;
  status: "uploading" | "complete" | "error";
};

type CounterState = {
  user: string;
  sessionId: number;
  messages: Message[];
  setMessages: (newMessages: Message[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  questions: Question[];
  setQuestions: (newQuestions: Question[]) => void;
  botLoading: boolean;
  setBotLoading: (loading: boolean) => void;
  socketState: SocketState;
  setSocketState: (state: SocketState) => void;
  uploadedFiles: FileWithProgress[];
};
