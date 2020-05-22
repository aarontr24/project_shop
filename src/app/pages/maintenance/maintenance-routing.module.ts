import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { StoresComponent } from './stores/stores.component';

const routes: Routes = [
  { path: 'usuarios', component: UsuariosComponent, data: { titulo: 'Usuarios'} },
  { path: 'stores', component: StoresComponent, data: { titulo: 'Almacénes'} },
  { path: '', pathMatch: 'full', redirectTo: 'usuarios' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintenanceRoutingModule { }
