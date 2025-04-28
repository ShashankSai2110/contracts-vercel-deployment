"use client";

import Sidebar from "@/components/sidebar";
import FileUpload from "@/components/file-upload";
import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import UploadSupportingDocuments from "@/components/supporting-documents-upload";
import { useStore } from "@/lib/useStore";
import WebSocketLoaders from "@/components/web-socket-loaders";
import background from "@/assets/background.png";
export default function Home() {
  const { user, messages, isFileUploaded } = useStore();

  return (
    <div
      className="outer-container pl-5 pr-0 pt-5 pb-5 min-h-screen"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="relative flex h-screen w-full bg-[#FFFFFF73] rounded-tl-[30px] rounded-bl-[30px]">
        <Sidebar />

        <main className="flex-1 relative h-full overflow-y-auto scrollbar-hide">
          {/* Grey background container */}

          {/* White foreground box */}
          <div
            className={`absolute transition-all duration-500 z-10 inset-5 left-0 `}
          >
            <div className="bg-white rounded-[30px] w-full h-full flex flex-col">
              <div className="p-8 flex flex-1 overflow-hidden rounded-[30px]">
                {/* Left Side - Chat + Upload */}
                <div className="flex flex-col overflow-scroll w-full transition-all duration-500">
                  <div className="flex justify-center items-center mb-4">
                    <h1 className="text-3xl font-medium">
                      Welcome back,{" "}
                      <span className="bg-gradient-to-r from-[#D62976] via-[#EB3D53] to-[#ED6B36] bg-clip-text text-transparent">
                        {user}
                      </span>
                    </h1>
                  </div>

                  <div className="flex-1 flex flex-col">
                    <FileUpload />
                    {isFileUploaded && <UploadSupportingDocuments />}
                    <WebSocketLoaders />
                    <ChatMessages messages={messages} />
                    <ChatInput />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}