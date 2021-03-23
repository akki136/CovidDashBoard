import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NewUserComponent } from './new-user/new-user.component';


const routes: Routes = [
  
  { path: '', pathMatch: 'full', redirectTo: '/covidInfo/login' },

  {
		path: "covidInfo",
		component: AppComponent,
		children: [
			{
				path: "login",
				component: LoginComponent
			},
      {
				path: "register",
				component: NewUserComponent
			},

			{
				path: "dashboard",
				component: DashboardComponent
			}
		]
	}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 


}
