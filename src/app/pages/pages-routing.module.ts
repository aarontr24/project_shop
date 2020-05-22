import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page1Component } from './page1/page1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard'} },
  { path: 'pages1', component: Page1Component, data: { titulo: 'Páginas'} },
  { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema'} },
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
  { path: 'usuarios', component: ProfileComponent, data: { titulo: 'Perfil de usuario'} },
  { path: 'maintenance', loadChildren: './maintenance/maintenance.module#MaintenanceModule'},
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
