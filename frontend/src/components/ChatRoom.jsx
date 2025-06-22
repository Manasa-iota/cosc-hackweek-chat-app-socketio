import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { socket } from "../socket";

export default function ChatRoom() {
  const { roomId } = useParams();
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (!joined || !roomId || !username) return;

    socket.emit("joinRoom", { room: roomId, username });

    socket.on("roomHistory", (msgs) => setMessages(msgs));
    socket.on("chatMessage", (msg) => setMessages((prev) => [...prev, msg]));

    return () => socket.off();
  }, [joined, roomId, username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    socket.emit("chatMessage", {
      room: roomId,
      sender: username,
      text: input,
      timestamp: new Date().toISOString(),
    });
    setInput("");
  };

  const shareLink = `${window.location.origin}/room/${roomId}`;

  if (!joined) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 px-4">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md text-center space-y-4">
          <h2 className="text-2xl font-bold">Join Chat Room</h2>
          <p className="text-gray-600 text-sm">
            Room ID: <span className="font-mono">{roomId}</span>
          </p>
          <input
            className="border px-4 py-2 w-full rounded text-center"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            onClick={() => setJoined(true)}
            className="bg-indigo-600 text-white px-4 py-2 w-full rounded hover:bg-indigo-700 transition"
          >
            Join
          </button>
          <div className="text-left text-sm">
            <p className="text-gray-500">Room Share Link:</p>
            <input
              className="border px-3 py-1 w-full text-xs mb-2 rounded text-center"
              value={shareLink}
              readOnly
            />
            <button
              onClick={() => navigator.clipboard.writeText(shareLink)}
              className="text-indigo-600 hover:underline"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-6 flex flex-col h-[85vh]">
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            Room ID: <span className="font-mono text-indigo-600">{roomId}</span>
          </h2>
          <p className="text-sm text-gray-500">
            Logged in as <strong>{username}</strong>
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4 px-1 py-2 hide-scrollbar">
          {messages.map((msg, i) => {
            const isOwn = msg.sender === username;
            const time = new Date(
              msg.timestamp || Date.now()
            ).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            });

            return (
              <div
                key={i}
                className={`flex ${
                  isOwn ? "justify-end" : "justify-start"
                } w-full`}
              >
                <div
                  className={`max-w-[75%] flex flex-col gap-1 ${
                    isOwn ? "items-end" : "items-start"
                  }`}
                >
                  <span className="text-xs text-indigo-500 font-medium">
                    {isOwn ? "You" : msg.sender}
                  </span>
                  <div
                    className={`px-4 py-3 rounded-2xl text-sm shadow-md ${
                      isOwn
                        ? "bg-indigo-100 text-gray-800"
                        : "bg-white text-gray-900"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[11px] text-gray-400">{time}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSend} className="mt-4 flex gap-3">
          <input
            className="flex-1 bg-white px-4 py-2 text-base rounded-full shadow border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-5 py-2 rounded-full hover:bg-indigo-700 transition"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
