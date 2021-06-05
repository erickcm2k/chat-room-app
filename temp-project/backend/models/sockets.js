class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on("connection", (socket) => {
      console.log("cliente conectado");
      socket.on("disconnect", () => {
        console.log("cliente desconectado");
      });
    });
  }
}

module.exports = Sockets;
