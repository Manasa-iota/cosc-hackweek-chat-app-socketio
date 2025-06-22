import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [roomId, setRoomId] = useState("");
  const navigate = useNavigate();

  const createRoom = async () => {
    const res = await fetch("http://localhost:3000/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Untitled Room" }),
    });
    const data = await res.json();
    navigate(`/room/${data._id}`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-4">
      <video
        src="/logo.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="w-32 h-32 mb-6 rounded-lg shadow-md"
      />

      <h1 className="text-3xl font-bold mb-2">Welcome to the Chat Room</h1>
      <p className="mb-6 text-gray-600">Create a new room to start chatting!</p>

      <button
        onClick={createRoom}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Create New Room
      </button>

      <hr className="my-6 w-64 border-t border-gray-300" />

      <p className="mb-2">Or join an existing room by ID:</p>
      <div className="flex gap-2">
        <input
          className="border px-3 py-2 rounded w-64"
          placeholder="Enter Room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        <button
          onClick={() => navigate(`/room/${roomId}`)}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}
