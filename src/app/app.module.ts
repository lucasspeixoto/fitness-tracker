import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material.module';
import { SignupComponent } from './auth/signup/signup.component';
import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AuthService } from './shared/services/auth.service';
import { TrainingService } from './shared/services/training.service';

@NgModule({
	declarations: [
		AppComponent,
		SignupComponent,
		LoginComponent,
		TrainingComponent,
		CurrentTrainingComponent,
		StopTrainingComponent,
		NewTrainingComponent,
		PastTrainingsComponent,
		WelcomeComponent,
		HeaderComponent,
		SidenavListComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		AppRoutingModule,
		MaterialModule,
		FlexLayoutModule,
	],
	providers: [AuthService, TrainingService],
	bootstrap: [AppComponent],
})
export class AppModule {}
