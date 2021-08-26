import { Inject, Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import {MatSnackBar} from '@angular/material/snack-bar';
@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private isAuthenticated: boolean = false;

	constructor(
		private router: Router,
		private angularFireAuth: AngularFireAuth,
		public ngZone: NgZone,
    private _snackBar: MatSnackBar
	) {}

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

	registerUser(authData: AuthData) {
		this.angularFireAuth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				console.log(result);
				this.authSuccessFully();
			})
			.catch(error => {
				console.log(error.message);
			});
	}

	login(authData: AuthData) {
		this.angularFireAuth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				this.openSnackBar('Logado', 'X')
				this.authSuccessFully();
			})
			.catch(error => {
				this.openSnackBar(error.message, 'X')
			});
	}

	logout() {
		this.authChange.next(false);
		this.router.navigate(['/login']);
		this.isAuthenticated = false;
	}

	isAuth() {
		return this.isAuthenticated;
	}

	authSuccessFully() {
		this.isAuthenticated = true;
		this.authChange.next(true);
		this.router.navigate(['/training']);
	}
}
