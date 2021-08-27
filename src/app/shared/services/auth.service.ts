import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import { TrainingService } from './training.service';
import { UiService } from './ui.service';
@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private isAuthenticated: boolean = false;

	constructor(
		private router: Router,
		private angularFireAuth: AngularFireAuth,
		private trainingService: TrainingService,
		private uiService: UiService,
	) {}

	initAuthListener() {
		this.angularFireAuth.authState.subscribe(user => {
			if (user) {
				this.isAuthenticated = true;
				this.authChange.next(true);
				this.router.navigate(['/training']);
			} else {
				this.trainingService.cancelSubscriptions();
				this.authChange.next(false);
				this.router.navigate(['/login']);
				this.isAuthenticated = false;
			}
		});
	}

	registerUser(authData: AuthData) {
		this.uiService.loadingStateChanged.next(true);
		this.angularFireAuth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.uiService.loadingStateChanged.next(false);
				this.uiService.showMessage('SignIn', 'X');
			})
			.catch(error => {
				this.uiService.loadingStateChanged.next(false);
				this.uiService.showMessage(error.message, 'X');
			});
	}

	login(authData: AuthData) {
		this.uiService.loadingStateChanged.next(true);
		this.angularFireAuth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.uiService.loadingStateChanged.next(false);
				this.uiService.showMessage('Logged In', 'X');
			})
			.catch(error => {
				console.log('Erro');
				this.uiService.loadingStateChanged.next(false);
				this.uiService.showMessage(error.message, 'X');
			});
	}

	logout() {
		this.angularFireAuth.signOut();
	}

	isAuth() {
		return this.isAuthenticated;
	}
}
