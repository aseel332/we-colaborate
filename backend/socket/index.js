import chatSocket, { branchChatSocket } from "./chatSocket.js";
import taskSocket from "./taskSocket.js";

export default function initializeSocket(io) {
  io.on('connection', (socket) => {
    console.log('New client connected', socket.id);
    chatSocket(io, socket);
    taskSocket(io, socket);
    branchChatSocket(io, socket);
  });

}