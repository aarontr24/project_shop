import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;

  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  formUser: FormGroup;
  formPass: FormGroup;

  constructor( public _usuarioService: UsuarioService) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit(): void {
    
    this.formUser = new FormGroup({
      'nombre': new FormControl(this.usuario.name, Validators.required),
      'apellido': new FormControl(this.usuario.lastname, Validators.required),
      'telefono': new FormControl(this.usuario.phone, Validators.pattern('((9)([0-9]){8})*')),
      'correo': new FormControl(this.usuario.email, [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])
    });
    
    this.formPass = new FormGroup({
      'password': new FormControl('', Validators.required),
      'password2' : new FormControl('')
    });

    this.formPass.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.formPass)
    ]);
  }

  guardarCambios() {
    this.usuario.name = this.formUser.value.nombre;
    this.usuario.lastname = this.formUser.value.apellido;
    this.usuario.phone = this.formUser.value.telefono;
    this.usuario.email = this.formUser.value.correo;
    this._usuarioService.actualizarUsuario( this.usuario )
      .subscribe();
  }

  noIgual( control: FormControl ): { [s:string]:boolean} {
    const form: any = this;
    if ( control.value !== form.controls['password'].value ) {
      return {
        noiguales: true
      };
    }
    return null;
  }

  guardarPass() {
    this._usuarioService.actualizarPass( this.usuario, this.formPass.value.password)
      .subscribe();
  }

  seleccionImage(file: File) {

    if (!file) {
      this.imagenSubir = null;
      return;
    }

    if ( file.type.indexOf('image') < 0 ) {
      Swal.fire('Sólo imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = file;

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => this.imagenTemp = reader.result;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen( this.imagenSubir, this.usuario.id );
  }

}
