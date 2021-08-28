import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
@Injectable()
export class AuthService {

	constructor(
		private router: Router,
		private angularFireAuth: AngularFireAuth,
		private trainingService: TrainingService,
		private uiService: UiService,
		private store: Store<fromRoot.State>,
	) {}

	initAuthListener() {
		this.angularFireAuth.authState.subscribe(user => {
			if (user) {
				/* this.isAuthenticated = true;
				this.authChange.next(true); */
        this.store.dispatch(new Auth.SetAuthenticated)
				this.router.navigate(['/training']);
			} else {
				this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated)
				/* this.isAuthenticated = false;
				this.authChange.next(false); */
				this.router.navigate(['/login']);
			}
		});
	}

	registerUser(authData: AuthData) {
		this.store.dispatch(new UI.StartLoading());
		this.angularFireAuth
			.createUserWithEmailAndPassword(authData.email, authData.password)
			.then(result => {
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
				this.store.dispatch(new UI.StopLoading());
				this.uiService.showMessage('Logged In', 'X');
			})
			.catch(error => {
				this.store.dispatch(new UI.StopLoading());
				this.uiService.showMessage(error.message, 'X');
			});
	}

	logout() {
		this.angularFireAuth.signOut();
	}

}
