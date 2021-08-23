import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {
	authChange = new Subject<boolean>();
	private user: User;

	constructor(private router: Router) {}

	registerUser(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString(),
		};
		this.authSuccessFully();
	}

	login(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString(),
		};
		this.authSuccessFully();
	}

	logout() {
		this.user = null;
		this.authChange.next(false);
		this.router.navigate(['/login']);
	}

	getUser() {
		return { ...this.user };
	}

	isAuth() {
		return this.user != null;
	}

	authSuccessFully() {
		this.authChange.next(true);
		this.router.navigate(['/training']);
	}
}
