import { Usuario } from "./usuario";


export class UsuariosLista {

    private lista: Usuario[] = [];


    constructor() {

    }

    // Agregar un usuario
    public agregar( usuario: Usuario ) {
        this.lista.push( usuario );

        console.log('====== agregar usuario ======');
        console.log( this.lista );
        
        return this.lista;
    }

    // Actualizar nombre a un usuario
    public actualizarNombre( id: string, nombre: string ) {
        for( let usuario of this.lista ) {
            if ( usuario.id === id ) {
                usuario.nombre = nombre;
                break;
            }
        }

        console.log('====== Atualizando usuario ======');
        console.log(this.lista);
    }

    // Obtener lista de usuarios
    public getLista() {
        let lista = this.lista;

        console.log(`====== getLista ======`);
        console.log( lista );

        return lista;
    }

    // Obtener un usuario
    public getUsuario( id: string ) {
        let usuario = this.lista.find( usuario => usuario.id === id );

        console.log(`====== getUsuario USUARIO: ${ id } ======`);
        console.log(usuario);

        return usuario;
    }

    // Obtener usuarios en una sala en particular
    public getUsuariosEnSala( sala: string ) {
        let usuarioEnSala = this.lista.filter( usuario => usuario.sala === sala );

        console.log(`====== getUsuarioEnSala SALA: ${ sala } ======`);
        console.log(usuarioEnSala);
        
        return usuarioEnSala;
    }

    // Borrar usuario
    public borrarUsuario ( id: string ) {
        const tempUsuario = this.getUsuario( id );
        this.lista = this.lista.filter( usuario => usuario.id !== id );

        console.log('====== borrarUsuario usuario ======');
        console.log( this.lista );

        return tempUsuario;
    }
}