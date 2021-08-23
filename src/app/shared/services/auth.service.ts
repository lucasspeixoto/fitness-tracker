import { AuthData } from '../models/auth-data.model';
import { User } from '../models/user.model';

export class AuthService {
	private user: User;

	registerUser(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString(),
		};
	}

	login(authData: AuthData) {
		this.user = {
			email: authData.email,
			userId: Math.round(Math.random() * 10000).toString(),
		};
	}

	logout() {
		this.user = null;
	}

	getUser() {
		return { ...this.user };
	}

	isAuth() {
		return this.user != null;
	}
}
