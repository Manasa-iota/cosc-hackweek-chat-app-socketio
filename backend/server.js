import { createServer } from "http"
import dotenv from "dotenv"
import { app } from "./app.js"
import { connectDB } from "./config/db.js"
import { setupSocket } from "./services/socket.service.js"

dotenv.config()

const server = createServer(app)
setupSocket(server)
connectDB()

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`)
})
