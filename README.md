COSC Hackweek – Real-Time Chat App
===========================================

This is a real-time chat application built for the COSC Hackweek challenge:
"Real-Time Chat Room Using Socket.IO"

Overview
-------------------------------------------
A full-stack chat app using React (frontend) and Node.js + Express + Socket.IO + MongoDB (backend).
Users can join, send messages, and see chat history update in real time across all connected clients.

-------------------------------------------
Features
-------------------------------------------
- Instant, bi-directional messaging using WebSockets
- Multiple users can chat concurrently
- Messages are persisted using MongoDB
- React frontend with live chat feed and user input
- Lightweight backend with WebSocket integration

-------------------------------------------
Tech Stack
-------------------------------------------
- Backend: Node.js, Express, Socket.IO, MongoDB
- Frontend: React (JavaScript)

-------------------------------------------
Project Structure
-------------------------------------------
- frontend/ — React-based UI
- backend/  — Express server with Socket.IO and MongoDB integration

-------------------------------------------
How to Run Locally
-------------------------------------------

1. Clone the repository:
   git clone https://github.com/Manasa-iota/cosc-hackweek-chat-app-socketio.git

2. Navigate into the project directory:
   cd cosc-hackweek-chat-app-socketio

3. Install backend dependencies:
   cd backend
   npm install

4. Set up MongoDB:
   - Make sure MongoDB is running locally or use MongoDB Atlas
   - Create a `.env` file inside `backend/` and add:
     MONGO_URI=<your-mongo-uri>

5. Start the backend server:
   npm start

6. Open a new terminal and install frontend dependencies:
   cd ../frontend
   npm install

7. Start the React frontend:
   npm start

8. Open your browser and go to:
   http://localhost:5173

9. Open multiple tabs to test real-time communication.

-------------------------------------------
Live Demo
-------------------------------------------
https://tangerine-unicorn-cb6987.netlify.app/

-------------------------------------------
Hackweek Challenge Details
-------------------------------------------
Built for: COSC Hackweek – "Real-Time Chat Room Using Socket.IO"
