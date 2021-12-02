import Server from "./classes/server";

const server = new Server();

server.setMiddleware();
server.enabledCors();
server.setRoutes();

server.start( () => {
    console.log('Servidor corriendo en el puerto:', server.port);
} );