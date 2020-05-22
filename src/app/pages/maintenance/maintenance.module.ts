import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { StoresComponent } from './stores/stores.component';
import { PipesModule } from '../../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    StoresComponent,
    ModalUploadComponent
  ],
  imports: [
    CommonModule,
    MaintenanceRoutingModule,
    PipesModule,
    FormsModule
  ],
  exports: [
  ]
})
export class MaintenanceModule { }

