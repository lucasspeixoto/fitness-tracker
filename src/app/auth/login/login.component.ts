import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/shared/ui.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
	loginForm: FormGroup;

	isLoading: boolean = false;

	private loadingSubscription: Subscription;

	constructor(private authService: AuthService, private uiService: UiService) {}

	ngOnInit() {
		this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
			loading => {
				this.isLoading = loading;
			},
		);
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

	ngOnDestroy() {
		if (this.loadingSubscription) {
			this.loadingSubscription.unsubscribe();
		}
	}
}
