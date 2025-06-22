import { useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { socket } from "../socket"

export default function ChatRoom() {
  const { roomId } = useParams()
  const [username, setUsername] = useState("")
  const [joined, setJoined] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    if (!joined || !roomId || !username) return

    socket.emit("joinRoom", { room: roomId, username })

    socket.on("roomHistory", (msgs) => setMessages(msgs))
    socket.on("chatMessage", (msg) => setMessages((prev) => [...prev, msg]))

    return () => socket.off()
  }, [joined, roomId, username])

  const handleSend = (e) => {
    e.preventDefault()
    if (!input.trim()) return
    socket.emit("chatMessage", {
      room: roomId,
      sender: username,
      text: input,
    })
    setInput("")
  }

  const shareLink = `${window.location.origin}/room/${roomId}`

  if (!joined) {
    return (
      <div>
        <h2>Join Room</h2>
        <p>Room ID: {roomId}</p>
        <input
          placeholder="Enter your name"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={() => setJoined(true)}>Join</button>

        <p>Room Share Link:</p>
        <input value={shareLink} readOnly />
        <button onClick={() => navigator.clipboard.writeText(shareLink)}>
          Copy Link
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2>Room ID: {roomId}</h2>
      <p>You are logged in as <strong>{username}</strong></p>

      <ul>
        {messages.map((msg, i) => (
          <li key={i}><strong>{msg.sender}</strong>: {msg.text}</li>
        ))}
      </ul>

      <form onSubmit={handleSend}>
        <input
          placeholder="Type your message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
