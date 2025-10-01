export default function taskSocket(io, socket) {
  socket.on("joinTask", (branchId) => {
    socket.join(`branch_${branchId}`);
    console.log(`Socket ${socket.id} joined branch_${branchId}`);
  });
  socket.on("leaveTask", (branchId) => {
    socket.leave(`branch_${branchId}`);
    console.log(`Socket ${socket.id} left branch_${branchId}`);
  });
}
