import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const authRoutes: Routes = [
	{ path: 'signup', component: SignupComponent },
	{ path: 'login', component: LoginComponent },
];
@NgModule({
	imports: [RouterModule.forChild(authRoutes)],
	exports: [RouterModule],
  providers: [AuthGuard]
})
export class AuthRoutingModule {}
