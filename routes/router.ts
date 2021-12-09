import { Router,Request, Response } from "express";
import Server from "../classes/server";
import { usuariosConectados } from "../sockets/socket";

export const router = Router();

router.get( '/mensajes', ( req: Request, res: Response ) => {
    res.status( 200 )
        .json({
            ok: true,
            msg: 'Respuesta desde /mensajes - GET'
        })
} );

router.post( '/mensajes', (req: Request, res: Response) => {

    const { cuerpo, de } = req.body;

    const payload = {
        cuerpo,
        de
    }

    const server: Server = Server.instance;

    server.io.emit( 'mensaje-nuevo', payload );

    res.status( 200 )
        .json({
            ok: true,
            msg: 'Respuesta desde /mensajes - POST',
            data: {
                cuerpo,
                de
            }
        })
} )

router.post( '/mensajes/:id', ( req: Request, res: Response ) => {
    const { id } = req.params;
    const { cuerpo, de } = req.body;

    const payload = {
        de,
        cuerpo
    }

    const server: Server = Server.instance;

    server.io.in( id ).emit( 'mensaje-privado', payload )

    res.status(200)
        .json({
            ok: true,
            cuerpo,
            de,
            id
        })
} )

// Servicio para obtener todos los IDs de los usuarios
router.get('/usuarios', ( req: Request, res: Response ) => {

    const server: Server = Server.instance;

    server.io.fetchSockets()
        .then( ( sockets ) => {
            res.json({
                ok: true,
                // clientes
                clientes: sockets.map( cliente => cliente.id )
            });
        } )
        .catch( ( err ) => {
            res.status(200)
                .json({
                    ok: false,
                    err
                })
        } )
})

// Obtener usuarios y sus nombres
router.get( '/usuarios/detalle', ( req: Request, res: Response ) => {

    
    res.json({
        ok: true,
        clientes: usuariosConectados.getLista()
    });
} )