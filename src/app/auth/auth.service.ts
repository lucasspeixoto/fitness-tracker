import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import {
	AngularFirestore,
	AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import { User } from './user.model';
@Injectable()
export class AuthService {
	constructor(
		private router: Router,
		private angularFireAuth: AngularFireAuth,
		private angularFirestore: AngularFirestore,
		private trainingService: TrainingService,
		private uiService: UiService,
		private store: Store<fromRoot.State>,
	) {}

	setUserLocally(user: User) {
		localStorage.setItem('user', JSON.stringify(user));
	}

	removeUserLocally() {
		localStorage.removeItem('user');
	}

	initAuthListener() {
		this.angularFireAuth.authState.subscribe(user => {
			if (user) {
				this.store.dispatch(new Auth.SetAuthenticated());
				this.router.navigate(['/training']);
			} else {
				this.trainingService.cancelSubscriptions();
				this.store.dispatch(new Auth.SetUnauthenticated());
				this.removeUserLocally();
				this.router.navigate(['/login']);
			}
		});
	}

	registerUser(authData: AuthData) {
		this.store.dispatch(new UI.StartLoading());
		this.angularFireAuth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				let user = {
					userId: result.user.uid,
					email: result.user.email,
				};
				this.setUserData(user);
        this.setUserLocally(user);
				this.store.dispatch(new UI.StopLoading());
				this.uiService.showMessage('SignIn', 'X');
			})
			.catch(error => {
				this.store.dispatch(new UI.StopLoading());
				this.uiService.showMessage(error.message, 'X');
			});
	}

	login(authData: AuthData) {
		this.store.dispatch(new UI.StartLoading());
		this.angularFireAuth
			.signInWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
				let user = {
					userId: result.user.uid,
					email: result.user.email,
				};
				this.setUserLocally(user);
				this.store.dispatch(new UI.StopLoading());
				this.uiService.showMessage('Logged In', 'X');
			})
			.catch(error => {
				this.store.dispatch(new UI.StopLoading());
				this.uiService.showMessage(error.message, 'X');
			});
	}

	logout() {
		this.removeUserLocally();
		this.angularFireAuth.signOut();
	}

	setUserData(user: User) {
		const userRef: AngularFirestoreDocument<any> = this.angularFirestore.doc(
			`users/${user.userId}`,
		);
		const userData: User = {
			userId: user.userId,
			email: user.email,
		};
		return userRef.set(userData, { merge: true });
	}
}
