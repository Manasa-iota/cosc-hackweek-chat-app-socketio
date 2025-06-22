import { useEffect, useState } from "react"
import { socket } from "../socket"

export default function Chat({ username, room }) {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")

  useEffect(() => {
    socket.emit("joinRoom", { room, username })

    socket.on("roomHistory", (msgs) => setMessages(msgs))
    socket.on("chatMessage", (msg) => setMessages(prev => [...prev, msg]))

    return () => socket.off()
  }, [room, username])

  const sendMessage = (e) => {
    e.preventDefault()
    if (input.trim()) {
      socket.emit("chatMessage", { room, sender: username, text: input })
      setInput("")
    }
  }

  return (
    <div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}><strong>{msg.sender}</strong>: {msg.text}</li>
        ))}
      </ul>
      <form onSubmit={sendMessage}>
        <input value={input} onChange={e => setInput(e.target.value)} />
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
