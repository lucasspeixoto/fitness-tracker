import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { TrainingService } from './training.service';
import { UiService } from './ui.service';
@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private isAuthenticated: boolean = false;

	horizontalPosition: MatSnackBarHorizontalPosition = 'center';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor(
		private router: Router,
		private angularFireAuth: AngularFireAuth,
		private trainingService: TrainingService,
		private matSnackBar: MatSnackBar,
		private uiService: UiService,
	) {}

	initAuthListener() {
		this.angularFireAuth.authState.subscribe((user: any) => {
			if (user) {
				this.isAuthenticated = true;
				this.authChange.next(true);
				this.router.navigate(['/training']);
			} else {
				//this.trainingService.cancelSubscriptions(); //With Subscription instead of take operator
				this.authChange.next(false);
				this.router.navigate(['/login']);
				this.isAuthenticated = false;
			}
		});
	}

	showMessage(message: string, action: string) {
		this.matSnackBar.open(message, action, {
			panelClass: 'snack',
			duration: 1500,
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}

	registerUser(authData: AuthData) {
		this.uiService.loadingStateChanged.next(true);
		this.angularFireAuth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.uiService.loadingStateChanged.next(false);
				this.showMessage('SignIn', 'X');
			})
			.catch(error => {
				this.uiService.loadingStateChanged.next(false);
				this.showMessage(error.message, 'X');
			});
	}

	login(authData: AuthData) {
		this.uiService.loadingStateChanged.next(true);
		this.angularFireAuth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.uiService.loadingStateChanged.next(false);
				this.showMessage('Logged In', 'X');
			})
			.catch(error => {
				this.uiService.loadingStateChanged.next(false);
				this.showMessage(error.message, 'X');
			});
	}

	logout() {
		this.angularFireAuth.signOut();
	}

	isAuth() {
		return this.isAuthenticated;
	}
}
