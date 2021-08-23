import { Subject } from 'rxjs';
import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

export class AuthService {
	authChange = new Subject<boolean>();
	private user: User;

	registerUser(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString(),
		};
    this.authChange.next(true)
	}

	login(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString(),
		};
    this.authChange.next(true)
	}

	logout() {
		this.user = null;
    this.authChange.next(false)
	}

	getUser() {
		return { ...this.user };
	}

	isAuth() {
		return this.user != null;
	}
}
