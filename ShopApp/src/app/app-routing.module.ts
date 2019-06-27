import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from 'src/app/signup/signup.component';
import { HomeComponent } from 'src/app/home/home.component';
import { ShoppingComponent } from 'src/app/shopping/shopping.component';
import { LoginComponent } from 'src/app/login/login.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { OrderComponent } from 'src/app/order/order.component';
import { AdminComponent } from 'src/app/admin/admin.component';

const routes: Routes = [
  { 
    path: 'signup', 
    component: SignupComponent,
    children: [
      { path: '', component: DashboardComponent },
  ] 
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'shopping', 
    component: ShoppingComponent 
  },
  { 
    path: 'order', 
    component: OrderComponent 
  },
  { 
    path: 'admin', 
    component: AdminComponent 
  },
  // { 
  //   path: '', 
  //   redirectTo: 'tasks', 
  //   pathMatch: 'full'
  // },
  { 
  path: '', component: LoginComponent,
        children: [
            { path: '', component: DashboardComponent },
        ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
