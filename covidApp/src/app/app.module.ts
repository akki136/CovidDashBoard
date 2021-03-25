import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewUserComponent } from './new-user/new-user.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from "@angular/flex-layout";
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { PieViewComponent } from './pie-view/pie-view.component';
import { CommonModule } from "@angular/common";
import { HighchartsChartModule } from "highcharts-angular";
import { AreaViewComponent } from './area-view/area-view.component';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from './header/header.component';
import { CardComponent } from './card/card.component';
import { MainComponent } from './main/main.component';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';
import { TooltipDirective } from './tooltip.directive';
const pages = [DashboardComponent, MainComponent,MatSortModule,MatInputModule];
@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    LoginComponent,
    PieViewComponent,
    AreaViewComponent,
    TableComponent,
    DashboardComponent,
    HeaderComponent,
    MainComponent,
    CardComponent,
    TooltipDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    HttpClientModule,
    HighchartsChartModule,
    MatSortModule,
    MatInputModule,
    CommonModule,
    ToastrModule.forRoot()
  ],
  exports: pages,
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
