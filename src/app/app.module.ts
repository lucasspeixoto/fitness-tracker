import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/modules/material.module';

import { TrainingComponent } from './training/training.component';
import { CurrentTrainingComponent } from './training/current-training/current-training.component';
import { NewTrainingComponent } from './training/new-training/new-training.component';
import { PastTrainingsComponent } from './training/past-trainings/past-trainings.component';
import { WelcomeComponent } from './auth/welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';
import { StopTrainingComponent } from './training/current-training/stop-training.component';
import { AuthService } from './shared/services/auth.service';
import { TrainingService } from './shared/services/training.service';

import { environment } from 'src/environments/environment';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { UiService } from './shared/services/ui.service';
import { AuthModule } from './shared/modules/auth.module';

@NgModule({
	declarations: [
		AppComponent,
		TrainingComponent,
		CurrentTrainingComponent,
		StopTrainingComponent,
		NewTrainingComponent,
		PastTrainingsComponent,
		WelcomeComponent,
		HeaderComponent,
		SidenavListComponent,
		LoadingComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AppRoutingModule,
		MaterialModule,
		FlexLayoutModule,

		AuthModule,

		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFirestoreModule,
		AngularFireAuthModule,
	],
	providers: [AuthService, TrainingService, UiService],
	bootstrap: [AppComponent],
})
export class AppModule {}
