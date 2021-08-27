import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
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
        localStorage.setItem('isLogged', 'yes')
			} else {
				this.trainingService.cancelSubscriptions();
				this.authChange.next(false);
				this.router.navigate(['/login']);
				this.isAuthenticated = false;
        localStorage.removeItem('isLogged');
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
        localStorage.removeItem('isLogged');
			});
	}

	login(authData: AuthData) {
		this.uiService.loadingStateChanged.next(true);
		this.angularFireAuth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.uiService.loadingStateChanged.next(false);
				this.uiService.showMessage('Logged In', 'X');
        localStorage.setItem('isLogged', 'yes')
			})
			.catch(error => {
				console.log('Erro');
				this.uiService.loadingStateChanged.next(false);
				this.uiService.showMessage(error.message, 'X');
        localStorage.removeItem('isLogged');
			});
	}

	logout() {
    localStorage.removeItem('isLogged');
		this.angularFireAuth.signOut();
	}

	isAuth() {
		//return this.isAuthenticated;
    return localStorage.getItem('isLogged')
	}
}
