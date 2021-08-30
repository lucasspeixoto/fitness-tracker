import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
	maxDate = new Date();

	isLoading$: Observable<boolean>;

	constructor(
		private authService: AuthService,
		private store: Store<fromRoot.State>,
	) {}

	ngOnInit() {
		this.isLoading$ = this.store.select(fromRoot.getIsLoading);
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	}

	onSubmit(form: NgForm) {
		this.authService.registerUser({
			email: form.value.email,
			password: form.value.password,
		});
	}
}
