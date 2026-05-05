import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { messagesData } from "../data/messages";
import { teams } from "../data/teams";
import SkeletonText from "../components/SkeletonText";

function TeamWorkspace() {
  const { id } = useParams();

  // ambil data team
  const team = teams.find((t) => t.id === Number(id));

  // ambil message berdasarkan team id
  const initialMessages = messagesData[id] || [];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (loading) return;
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      { user: "You", text: input }
    ]);

    setInput("");
  };

  return (
    <div className="flex h-full">

      {/* Sidebar Channel */}
      <div className="flex w-56 flex-col border-r border-gray-200 bg-white p-4 text-black">
        <h2 className="mb-4 font-semibold text-black">
          {team ? team.teamName : `Team ${id}`}
        </h2>

        <div className="flex flex-col gap-2 text-sm">
          <div className="rounded bg-slate-100 p-2"># general</div>
          <div className="cursor-pointer rounded p-2 transition-colors hover:bg-slate-100">
            # random
          </div>
          <div className="cursor-pointer rounded p-2 transition-colors hover:bg-slate-100">
            # dev
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex flex-1 flex-col bg-white">

        {/* Header */}
        <div className="border-b border-gray-200 p-4 font-semibold text-gray-800 dark:border-gray-700 dark:text-gray-100">
          # general
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3, 4, 5].map((item) => (
                <div
                  key={item}
                  className={`flex ${item % 2 === 0 ? "justify-end" : "justify-start"}`}
                >
                  <div className="w-52 rounded-lg border border-gray-200 bg-white p-3">
                    <SkeletonText className="mb-2 h-3 w-12" />
                    <SkeletonText className="h-4 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Belum ada pesan di channel ini
            </p>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.user === "You"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs rounded-lg px-3 py-2 text-sm ${
                    msg.user === "You"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  }`}
                >
                  <p className="text-xs opacity-70">
                    {msg.user}
                  </p>
                  {msg.text}
                </div>
              </div>
            ))
          )}

          <div ref={messagesEndRef} />

        </div>

        {/* Input */}
        <div className="flex gap-2 border-t border-gray-200 p-3 dark:border-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ketik pesan..."
            className="flex-1 rounded border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 outline-none focus:border-blue-500 dark:text-gray-100 dark:placeholder:text-gray-400"
          />

          <button
            onClick={handleSend}
            className="rounded bg-blue-600 px-4 text-white transition-colors hover:bg-blue-500"
          >
            Kirim
          </button>
        </div>

      </div>
    </div>
  );
}

export default TeamWorkspace;
