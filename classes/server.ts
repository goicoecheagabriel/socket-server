import { json }         from 'body-parser';
import express          from 'express';
import { SERVER_PORT }  from '../global/environment';
import { router }       from '../routes/router';
import bodyParser       from 'body-parser';
import cors             from 'cors';
import socketIO         from 'socket.io';
import http             from 'http';
import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public  app         : express.Application;
    public  port        : number;
    private httpServer  : http.Server;
    public  io          : socketIO.Server;

    private constructor () {
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server( this.app );
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: true,
                credentials: true,
            }
        });

        // Ponemos a la escucha el servidor de sockets
        this.listenSockets();
    }

    public static get instance() {
        return this._instance || ( this._instance = new this() );
    }

    private listenSockets() {
        console.log('Escuchando conexiones - sockets');

        this.io.on( 'connection', cliente => {
            // console.log("CLIENTE CONECTADO:", cliente.id);

            // Conectar cliente
            socket.conectarCliente( cliente );

            // Configurar usuarios
            socket.configurarUsuario( cliente );        // configurar-usuario
          
            // eventos de cliente
            socket.mensaje( cliente, this.io );         // mensaje

            // desconectar
            socket.desconectar( cliente );

        } )
    }
    
    setMiddleware(){
        this.app.use(bodyParser.urlencoded({extended:true}))
        this.app.use( json() );
        console.log("MIDDLEWARES ACTIVATED");
    }

    enabledCors() {
        this.app.use( cors( {
            origin: true,
            credentials: true,
        } ) )
    }
    
    setRoutes() {
        // rutas de servicios.
        this.app.use( '/', router );
        console.log("ROUTES ACTIVATED");
    }
    
    start( callback: VoidFunction ) {


        //this.setRoutes();
        this.httpServer.listen( this.port, callback );
        
    }

}