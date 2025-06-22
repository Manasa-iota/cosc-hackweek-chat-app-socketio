import cors from "cors"
import express from "express"
import roomRoutes from "./routes/room.routes.js"

export const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",  
  methods: ["GET", "POST"],
  credentials: true
}))

app.use(express.json())
app.use(roomRoutes)
