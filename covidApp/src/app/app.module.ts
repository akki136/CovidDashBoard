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
import { SideBarViewComponent } from './side-bar-view/side-bar-view.component';
import { TableComponent } from './table/table.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CardComponent } from './card/card.component';
import { MainComponent } from './main/main.component';
const pages = [DashboardComponent, MainComponent];
@NgModule({
  declarations: [
    AppComponent,
    NewUserComponent,
    LoginComponent,
    PieViewComponent,
    AreaViewComponent,
    SideBarViewComponent,
    TableComponent,
    DashboardComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    CardComponent
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
    CommonModule,
    ToastrModule.forRoot()
  ],
  exports: pages,
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
