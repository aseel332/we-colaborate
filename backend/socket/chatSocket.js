export default function chatSocket(io, socket) {
  socket.on("joinConversation", (taskId) => {
    socket.join(`conversation_${taskId}`);
    console.log(`Socket ${socket.id} joined conversation_${taskId}`);
  });

   socket.on("leaveConversation", (taskId) => {
    socket.leave(`conversation_${taskId}`);
    console.log(`Socket ${socket.id} left conversation_${taskId}`);
  });
}

export function branchChatSocket(io, socket) {
  socket.on("joinBranch", (branchId) => {
    socket.join(`branch_conversation_${branchId}`);
    console.log(`Socket ${socket.id} joined branch_conversation_${branchId}`);
  });
    socket.on("leaveBranch", (branchId) => {
    socket.leave(`branch_conversation_${branchId}`);
    console.log(`Socket ${socket.id} left branch_conversation_${branchId}`);
  });
}


