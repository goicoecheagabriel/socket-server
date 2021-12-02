import { Router,Request, Response } from "express";

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
    const { id} = req.params;
    const { cuerpo, de } = req.body;
    res.status(200)
        .json({
            ok: true,
            msg: 'Respuesta desde /mensajes - POST',
            data: {
                cuerpo,
                de,
                id
            }
        })
} )