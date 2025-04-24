"use client";

import { useState } from "react";
import { Home, MessageSquare, LogOut } from "lucide-react";
import Image from "next/image";
import reveal_logo from "../assets/reveal_logo.png";

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState("home");

  return (
    <div className="w-64 h-full flex flex-col">
      <div className="p-6 mt-5">
        
        <Image src={reveal_logo} alt="logo" width={200} height={200} />
      </div>

      <nav className="flex-1 px-4 mt-8">
        <ul className="space-y-2">
          <li>
            <button
              className={`flex items-center w-full px-4 py-3 rounded-lg ${
                activeItem === "home"
                  ? "bg-white"
                  : "hover:bg-white hover:bg-opacity-10"
              }`}
              onClick={() => setActiveItem("home")}
            >
              <Home className="h-5 w-5 mr-3" />
              <span className="font-medium">Home</span>
            </button>
          </li>
          {/* <li>
            <button
              className={`flex items-center w-full px-4 py-3 rounded-lg ${
                activeItem === "chat"
                  ? "bg-white bg-opacity-20"
                  : "hover:bg-white hover:bg-opacity-10"
              }`}
              onClick={() => setActiveItem("chat")}
            >
              <MessageSquare className="h-5 w-5 mr-3" />
              <span className="font-medium">Active Chat</span>
            </button>
          </li> */}
        </ul>
      </nav>

      {/* <div className="p-4 mt-auto">
        <button className="flex items-center px-4 py-3 w-full hover:bg-white hover:bg-opacity-10 rounded-lg">
          <LogOut className="h-5 w-5 mr-3" />
          <span className="font-medium">Log Out</span>
        </button>
      </div> */}
    </div>
  );
}
