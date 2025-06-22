import express from "express"
import Room from "../models/Room.js"

const router = express.Router()

router.post("/api/rooms", async (req, res) => {
  const { name } = req.body
  const room = await Room.create({ name: name || "Untitled Room" })
  res.status(201).json({ _id: room._id })
})


export default router
