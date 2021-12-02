import { json } from 'body-parser';
import express from 'express';
import { SERVER_PORT } from '../global/environment';
import { router } from '../routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';

export default class Server {

    public app: express.Application;
    public port: number;

    constructor () {
        this.app = express();
        this.port = SERVER_PORT;
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
        this.app.listen( this.port, callback );
        
    }

}