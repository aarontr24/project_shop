import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SubirArchivoService } from '../subirArchivo/subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient,
               public router: Router,
               public _subirArchivoService: SubirArchivoService ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return (this.token.length > 5) ? true : false;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('user'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
  }

  login( usuario: Usuario, recordar: boolean = false ) {

    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    const url = URL_SERVICIOS + '/user/login';
    return this.http.post( url, usuario )
      .pipe(
        map( (resp: any) => {
          this.guardarStorage(resp.id, resp.token, resp.user );
          return true;
        })
      );
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    this.router.navigate(['/login']);
  }
  
  actualizarUsuario( usuario: Usuario) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICIOS + '/user/' + usuario.id;
    return this.http.put( url, usuario, {headers} )
      .pipe(
        map((resp: any) => {
          console.log(resp);

          let usuarioDB: Usuario = resp.userDB;
          this.guardarStorage( usuarioDB.id, this.token, usuarioDB );
          Swal.fire('Usuario actualizado', usuario.name + ' ' + usuario.lastname, 'success');
          return true;
        })
      );
  }

  actualizarPass( usuario: Usuario, password: string) {

    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICIOS + '/user/changePass/' + usuario.id;

    return this.http.patch( url, {password}, {headers} )
      .pipe(
        map((resp: any) => {
          if (resp.ok) {
            Swal.fire('Se cambió la contraseña', usuario.name + ' ' + usuario.lastname, 'success');
            return true;
          } else {
            Swal.fire('Error al cambiar la contraseña', resp.message , 'error');
            return true;
          }
        })
      );
  }

  cambiarImagen( file: File, id: string ) {
    this._subirArchivoService.subirArchivo( file, 'users', id )
      .then( (resp: any) => {
        this.usuario.image = resp.user.image;
        Swal.fire('Imágen actualizada', this.usuario.name + ' ' + this.usuario.lastname, 'success');

        this.guardarStorage(id, this.token, this.usuario);
      })
      .catch( err => {
        console.log(err);
      });
  }

  obtenerUsuarios( desde: number = 0 ) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICIOS + '/user?desde=' + desde;
    return this.http.get( url, {headers} );
  }

  buscarUsuarios( termino: string ) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    const url = URL_SERVICIOS + '/busqueda/collection/usuarios/' + termino;
    return this.http.get( url, {headers} );
      // .pipe(
      //     map((resp: any) => {
      //       if (resp.ok === false) {
      //         return resp.error;
      //       } else {
      //         return resp.usuarios;
      //       }
      //     })
      // );
  }

  // obtenerTotalUsuarios() {
  //   const headers = new HttpHeaders({
  //     'x-token': this.token
  //   });
  //   const url = URL_SERVICIOS + '/user/total';
  //   return this.http.get( url, {headers} );
  // }

  borrarUsuario( id: string ) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });
    let url = URL_SERVICIOS + '/user/' + id;
    return this.http.delete( url, {headers} );
  }

  activarUsuario( id: string ) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    let url = URL_SERVICIOS + '/user/' + id;

    return this.http.patch( url, {}, {headers} )
      .pipe(
          map((resp: any) => {
            if (resp.ok === false) {
              Swal.fire(
                'Error!',
                resp.message,
                'error'
              );
              return { ok: false };
            } else {
              return resp;
            }
          })
      );
  }

  cambiarRoleUsuario( id: string, role: number ) {
    const headers = new HttpHeaders({
      'x-token': this.token
    });

    let url = URL_SERVICIOS + '/user/changeRole/' + id;

    return this.http.patch( url, {role}, {headers} )
      .pipe(
          map((resp: any) => {
            if (resp.ok === false) {
              Swal.fire(
                'Error!',
                resp.message,
                'error'
              );
              return { ok: false };
            } else {
              return resp;
            }
          })
      );
  }

}
