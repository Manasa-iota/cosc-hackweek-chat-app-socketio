import { Server } from "socket.io"
import Message from "../models/Message.js"

export function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  })

  io.on("connection", (socket) => {
    socket.on("joinRoom", async ({ room, username }) => {
      socket.join(room)
      const history = await Message.find({ room }).sort({ timestamp: 1 }).limit(50)
      socket.emit("roomHistory", history)
    })

    socket.on("chatMessage", async ({ room, sender, text }) => {
      const message = await Message.create({ room, sender, text })
      io.to(room).emit("chatMessage", message)
    })
  })
}
