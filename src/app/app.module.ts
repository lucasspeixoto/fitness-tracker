import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { WelcomeComponent } from './components/welcome/welcome.component';
import { HeaderComponent } from './components/header/header.component';
import { SidenavListComponent } from './components/sidenav-list/sidenav-list.component';
import { AuthService } from './auth/auth.service';
import { TrainingService } from './training/training.service';

import { environment } from 'src/environments/environment';
import { UiService } from './shared/ui.service';
import { AuthModule } from './auth/auth.module';
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';
import { reducers } from './app.reducer';
@NgModule({
	declarations: [
		AppComponent,
		WelcomeComponent,
		HeaderComponent,
		SidenavListComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		AuthModule,
		FlexLayoutModule,
		MaterialModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebase),
		AngularFireDatabaseModule,
		AngularFirestoreModule,
		StoreModule.forRoot(reducers),
	],
	providers: [AuthService, TrainingService, UiService],
	bootstrap: [AppComponent],
})
export class AppModule {}
