import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../pipes/pipes.module';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Page1Component } from './page1/page1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaintenanceModule } from './maintenance/maintenance.module';

@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
    Page1Component,
    AccountSettingsComponent,
    ProfileComponent
  ],
  exports: [

  ],
  imports: [
    CommonModule,
    SharedModule,
    PagesRoutingModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    MaintenanceModule
  ]
})
export class PagesModule { }
