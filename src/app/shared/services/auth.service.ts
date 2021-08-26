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
		private _snackBar: MatSnackBar,
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

	openSnackBar(message: string, action: string, duration: number) {
		this._snackBar.open(message, action, {
			panelClass: 'snack',
			duration: duration * 1000,
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}

	registerUser(authData: AuthData) {
		this.angularFireAuth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.openSnackBar('SignIn', 'X', 1.5);
			})
			.catch(error => {
				this.openSnackBar(error.message, 'X', 1.5);
			});
	}

	login(authData: AuthData) {
		this.angularFireAuth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.openSnackBar('Logged In', 'X', 1.5);
			})
			.catch(error => {
				this.openSnackBar(error.message, 'X', 1.5);
			});
	}

	logout() {
		this.angularFireAuth.signOut();
	}

	isAuth() {
		return this.isAuthenticated;
	}
}
