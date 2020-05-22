import { Component, OnInit, ElementRef } from '@angular/core';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[];
  totalUsuario = 0;
  cargando = true;
  desde = 0;
  ok = true;
  msg: string;

  constructor( public _usuarioService: UsuarioService,
               public _modalUploadService: ModalUploadService ) { }

  ngOnInit(): void {
    this.cargarUsuarios();
    // this._usuarioService.obtenerTotalUsuarios()
    //   .subscribe((total: any) => {
    //     this.totalUsuario = total.usuarios[0].total;
        
    //   });
    this._modalUploadService.notificación
      .subscribe( resp => this.cargarUsuarios() );
  }

  mostrarModal( id: string ) {
    this._modalUploadService.mostrarModal('users', id);
  }

  cargarUsuarios() {
    this.cargando = true;
    this._usuarioService.obtenerUsuarios( this.desde )
      .subscribe((usuarios: any) => {
        this.usuarios = usuarios.data;
        this.totalUsuario = usuarios.total;
        this.cargando = false;
      });
  }

  buscarUsuario( termino: string ) {
    if ( termino.length <= 0 ) {
      this.ok = true;
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;
    this._usuarioService.buscarUsuarios( termino )
      .subscribe( (usuariosDB: any) => {
        if (usuariosDB.ok === false) {
          this.ok = false;
          this.msg = usuariosDB.error;
          this.cargando = false;

        } else {
          this.ok = true;
          this.usuarios = usuariosDB.usuarios;
          this.cargando = false;
        }
      });
  }

  cambiarDesde( valor: number) {
    let desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalUsuario ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }

  bloquearUsuario(usuario: Usuario) {
    if (usuario.id === this._usuarioService.usuario.id) {
      Swal.fire('No puede bloquear Usuario', ' No se puede bloquear a si mismo', 'error');
      return;
    }
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta a punto de bloquear la cuenta de ' + usuario.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, bloquearla!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.borrarUsuario( usuario.id )
          .subscribe( resp => {
            Swal.fire(
              'Bloqueada!',
              'La cuenta de ' + usuario.name + ' a sido bloqueada.',
              'success'
            );
            this.cargarUsuarios();
          });
      }
    });

  }

  desbloquearUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Esta a punto de desbloquear la cuenta de ' + usuario.name,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, desbloquearla!'
    }).then((result) => {
      if (result.value) {
        this._usuarioService.activarUsuario( usuario.id )
          .subscribe( resp => {
            if (resp.ok !== false) {
              this.cargarUsuarios();
              Swal.fire(
                'Desbloqueada!',
                'La cuenta de ' + usuario.name + ' fue activada.',
                'success'
              );
            }
          });
      }
    });
  }

  guardarRoleUsuario(usuario: Usuario) {
    if (usuario.id === this._usuarioService.usuario.id) {
      Swal.fire('No puede modificar Rol', ' No puede cambiar su rol actual', 'error');
      return;
    }
    Swal.fire({
      title: '¿Estas seguro?',
      text: `Esta a punto de cambiar a ${usuario.role} la cuenta de ${usuario.name}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, cambiarla!'
    }).then((result) => {
      if (result.value) {
        let role: number;
        switch (usuario.role) {
          case 'ADMIN':
            role = 1;
            break;
          case 'ALMACEN':
            role = 2;
            break;
          case 'VENTAS':
            role = 3;
            break;
        }
        this._usuarioService.cambiarRoleUsuario( usuario.id, role )
          .subscribe( resp => {
            Swal.fire(
              'Modificada!',
              'La cuenta de ' + usuario.name + ' ahora es ' + usuario.role,
              'success'
            );
            this.cargarUsuarios();
          });
      }
    });
  }


}
