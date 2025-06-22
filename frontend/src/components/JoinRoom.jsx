import { useState } from "react"

export default function RoomJoin({ onJoin }) {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const handleJoin = () => {
    if (username && room) {
      onJoin(username, room)
    }
  }

  return (
    <div>
      <input placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
      <input placeholder="Room" value={room} onChange={e => setRoom(e.target.value)} />
      <button onClick={handleJoin}>Join Room</button>
    </div>
  )
}
