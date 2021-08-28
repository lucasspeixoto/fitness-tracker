import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	isLoading$: Observable<boolean>;

	private loadingSubscription: Subscription;

	constructor(
		private authService: AuthService,
		private uiService: UiService,
		private store: Store<fromRoot.State>,
	) {}

	ngOnInit() {
		//this.store.subscribe(data => console.log(data))
		this.isLoading$ = this.store.select(fromRoot.getIsLoading)
		/* this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
			loading => {
				this.isLoading = loading;
			},
		); */
		this.loginForm = new FormGroup({
			email: new FormControl('', {
				validators: [Validators.required, Validators.email],
			}),
			password: new FormControl('', { validators: [Validators.required] }),
		});
	}

	onSubmit(form: NgForm) {
		this.authService.login({
			email: form.value.email,
			password: form.value.password,
		});
	}

	/* ngOnDestroy() {
		if (this.loadingSubscription) {
			this.loadingSubscription.unsubscribe();
		}
	} */
}
