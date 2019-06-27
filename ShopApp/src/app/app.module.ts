import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { OrderComponent } from './order/order.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from 'src/app/login.service';
import { CrudService } from 'src/app/crud.service';
import { SharingService } from 'src/app/sharing.service';
import * as $ from 'jquery';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ShoppingComponent,
    OrderComponent,
    AdminComponent,
    HomeComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
