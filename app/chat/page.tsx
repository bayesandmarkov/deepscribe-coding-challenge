"use client";

import { useEffect, useState } from "react";
import { Chatbot } from "@/components/ChatWindow";

export default function ChatPage() {
  const [text, setText] = useState('');
  const [sessionId, setSessionId] = useState('');

  const fetchText = async () => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/retrieve/`);
      if (!response.ok) {
        throw new Error('Failed to fetch text');
      }
      const data = await response.json();
      setText(data.text);
      setSessionId(data.session_id);
    } catch (error) {
      console.error('Error fetching text:', error);
    }
  };

  useEffect(() => {
    fetchText();
  }, []);

  return (
    <div className="flex h-screen">
      <div className="w-1/2 pt-14 pr-10">
        <p className="text-left p-0 overflow-auto h-full">
          {text}
        </p>
      </div>
      <div className="w-1/2 pt-10">
        <Chatbot initialText={text} fetchText={fetchText} sessionId={sessionId} />
      </div>
    </div>
  );
}
