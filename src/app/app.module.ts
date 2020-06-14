import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { HighchartsChartModule } from "highcharts-angular";
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highmaps from 'highcharts/modules/map.src';

@NgModule({
  imports: [
    ChartModule,
    HighchartsChartModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  providers: [{provide: HIGHCHARTS_MODULES , useFactory: () => [highmaps]}],
  bootstrap: [AppComponent]
})
export class AppModule { }
