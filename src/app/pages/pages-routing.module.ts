import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page1Component } from './page1/page1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pages1', component: Page1Component },
  { path: 'account-settings', component: AccountSettingsComponent },
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
