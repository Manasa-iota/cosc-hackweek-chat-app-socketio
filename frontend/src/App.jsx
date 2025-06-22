import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./components/Home"
import ChatRoom from "./components/ChatRoom"
import JoinRoom from "./components/JoinRoom"
import { socket } from "./socket"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/room/:roomId" element={<ChatRoom />} />
        <Route path="/join" element={<JoinRoom socket={socket} />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
