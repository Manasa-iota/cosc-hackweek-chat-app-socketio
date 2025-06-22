import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function Home() {
  const [roomId, setRoomId] = useState("")
  const navigate = useNavigate()

  const createRoom = async () => {
    const res = await fetch("http://localhost:3000/api/rooms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: "Untitled Room" }),
    })
    const data = await res.json()
    navigate(`/room/${data._id}`)
  }

  return (
    <div>
      <h1>Welcome to the Chat Room</h1>
      <p>Create a new room to start chatting!</p>
      <button onClick={createRoom}>Create New Room</button>

      <hr />

      <p className="mt-4">Or join an existing room by ID:</p>
      <input
        placeholder="Enter Room ID"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
      />
      <button onClick={() => navigate(`/room/${roomId}`)}>Join Room</button>
    </div>
  )
}
