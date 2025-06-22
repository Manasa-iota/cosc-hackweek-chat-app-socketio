import cors from "cors"
import express from "express"
import roomRoutes from "./routes/room.routes.js"

export const app = express()

app.use(cors({
  origin: "http://localhost:5173",  // <- Replace with your frontend port
  methods: ["GET", "POST"],
  credentials: true
}))

app.use(express.json())
app.use(roomRoutes)
