"use client";

import { useState } from "react";


export function Chatbot(props: { 
  initialText: string;
  fetchText: () => Promise<void>;
  sessionId: string;
}) {

  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (input.trim()) {
      setMessages([...messages, { sender: "User", text: input }]);
      setInput("");

      try {
        console.log("Initial text:", props.initialText);
        console.log("Session ID:", props.sessionId);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/chat/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: input, context_from_file: props.initialText, session_id: props.sessionId}),
        });

        if (!response.ok) {
          throw new Error("Failed to fetch response from server");
        }

        const data = await response.json();
        
        // Assuming the response is an object with a 'response' key containing the text
        const botResponse = data.response.content; // Adjust this line based on your actual response structure

        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "Bot", text: botResponse },
        ]);
      } catch (error) {
        console.error("Error fetching response:", error);
      }
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex mt-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-5 rounded-l-lg bg-gray-700"
          placeholder="Ask me about the medical document!"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-gray-100 text-black rounded-r-lg"
        >
          Send
        </button>
      </div>
      <div className="flex-grow overflow-auto p-4 rounded-lg shadow-md">
        {messages.map((message, index) => (
          <div key={index} className={`mb-2 ${message.sender === "User" ? "text-right" : "text-left"}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === "User" ? "bg-gray-700 text-white" : "bg-gray-300 text-black"}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
