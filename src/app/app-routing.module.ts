import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { TrainingComponent } from './training/training.component';

const AppRoutes: Routes = [
	{ path: '', component: WelcomeComponent },
	{ path: 'signup', component: SignupComponent },
	{ path: 'login', component: LoginComponent },
	{ path: 'training', component: TrainingComponent, canActivate: [AuthGuard] },
  {path: '**', component: LoginComponent}
];

@NgModule({
	imports: [RouterModule.forRoot(AppRoutes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
