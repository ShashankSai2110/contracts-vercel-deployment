"use client";

import React, { useRef, useState } from "react";
import { FileDiff, X, Check } from "lucide-react";
import { apiRequest } from "@/network/apis";
import constants from "@/lib/constants";
import { useStore } from "@/lib/useStore";

export default function UploadSupportingDocuments() {
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<FileWithProgress[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const { sessionId, setIsFileUploaded, setSocketState } = useStore();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleFiles(droppedFiles);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = async (fileList: FileList) => {
    const newFiles = Array.from(fileList).map((file) => ({
      file,
      progress: 0,
      status: "uploading" as const,
    }));

    setFiles((prev) => [...prev, ...newFiles]);

    const formData = new FormData();
    formData.append("session_id", sessionId.toString());
    formData.append("category", "supportingDocument"); 

    newFiles.forEach((fileWithProgress) => {
      formData.append("files", fileWithProgress.file);
    });

    const totalSize = newFiles.reduce((acc, f) => acc + f.file.size, 0);

    const response = await apiRequest(
      constants.UPLOAD_FILE,
      "POST",
      formData,
      true,
      (progressEvent) => {
        const loaded = progressEvent.loaded ?? 0;

        const progressPercent = Math.round((loaded / totalSize) * 100);

        setFiles((prevFiles) =>
          prevFiles.map((f) =>
            newFiles.some((nf) => nf.file === f.file)
              ? { ...f, progress: progressPercent }
              : f
          )
        );
      }
    );

    if (response.ok) {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          newFiles.some((nf) => nf.file === f.file)
            ? { ...f, status: "complete", progress: 100 }
            : f
        )
      );
      processFile();
    } else {
      setFiles((prevFiles) =>
        prevFiles.map((f) =>
          newFiles.some((nf) => nf.file === f.file)
            ? { ...f, status: "error", progress: 0 }
            : f
        )
      );
    }
  };

  const processFile = () => {
    const wsUrl = `ws://localhost:8000/api/v1/chat/embed_documents?session_id=${sessionId}`;
    socketRef.current = new WebSocket(wsUrl);

    socketRef.current.onopen = () => {
      console.log("WebSocket connected");
    };

    socketRef.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      console.log("WebSocket message:", message);

      if (["chunking", "embedding", "saving"].includes(message.status)) {
        setSocketState(message.status as any);
      }

      if (message.status === "done") {
        setSocketState("done");
        socketRef.current?.close();
        setIsFileUploaded(true);
      }
    };

    socketRef.current.onerror = (e) => {
      console.error("WebSocket error", e);
    };
  };

  const removeFile = (fileToRemove: File) => {
    setFiles((prevFiles) => prevFiles.filter((f) => f.file !== fileToRemove));
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <div
        className={`border-2 border-dashed rounded-lg p-3 flex flex-col items-center justify-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <FileDiff className="h-6 w-6 text-gray-400 mb-2" />
        <p className="text-gray-600 mb-2 text-sm">
         Optional: Upload Supporting Documents Here or{" "}
          <span
            className="text-gray-600 cursor-pointer underline"
            onClick={openFileDialog}
          >
            Choose a File
          </span>
        </p>
        <input
          type="file"
          className="hidden"
          id="fileInput"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept="application/pdf"
        />
      </div>
      {/* <div className="w-full flex justify-between text-xs text-gray-500 mt-4">
        <span>Supported formats: PDF</span>
        <span>Maximum Size: 25MB</span>
      </div> */}

      {files.length > 0 && (
        <div className="mt-4 space-y-3 max-h-48 overflow-y-auto">
          {files.map((fileWithProgress, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
            >
              <div className="flex items-center space-x-3">
                <FileDiff className="h-5 w-5 text-gray-700" />
                <span className="text-sm text-gray-700">
                  {fileWithProgress.file.name}
                </span>
              </div>

              <div className="flex items-center space-x-3">
                {fileWithProgress.status === "uploading" ? (
                  <div className="flex items-center space-x-2 w-48">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full"
                        style={{ width: `${fileWithProgress.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      {fileWithProgress.progress}%
                    </span>
                  </div>
                ) : fileWithProgress.status === "complete" ? (
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                ) : (
                  <div className="text-xs text-red-500">Failed</div>
                )}

                <button
                  onClick={() => removeFile(fileWithProgress.file)}
                  className="p-1 rounded-full hover:bg-gray-200"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}