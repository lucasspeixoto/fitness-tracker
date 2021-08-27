import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './auth/auth.guard';

const AppRoutes: Routes = [
	{ path: '', component: WelcomeComponent },
	{
		path: 'training',
		loadChildren: () => import('./training/training.module').then(m => m.TrainingModule),
    canLoad: [AuthGuard]
	},
];

@NgModule({
	imports: [RouterModule.forRoot(AppRoutes)],
	exports: [RouterModule],
	providers: [AuthGuard],
})
export class AppRoutingModule {}
