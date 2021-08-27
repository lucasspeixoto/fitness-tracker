import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { UiService } from 'src/app/shared/ui.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit, OnDestroy {
	maxDate = new Date();

	isLoading: boolean = false;

	private loadingSubscription: Subscription;

	constructor(private authService: AuthService, private uiService: UiService) {}

	ngOnInit() {
		this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
			loading => {
				this.isLoading = loading;
			},
		);
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	}

	onSubmit(form: NgForm) {
		this.authService.registerUser({
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
