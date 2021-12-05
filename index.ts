import Server from "./classes/server";

const server = Server.instance;

server.setMiddleware();

server.enabledCors();

server.setRoutes();

server.start( () => {
    console.log('Servidor corriendo en el puerto:', server.port);
} );