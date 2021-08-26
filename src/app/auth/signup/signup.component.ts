import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
	selector: 'app-signup',
	templateUrl: './signup.component.html',
	styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
	maxDate = new Date();

	isLoading: boolean = false;

	constructor(private authService: AuthService, private uiService: UiService) {}

	ngOnInit() {
		this.uiService.loadingStateChanged.pipe(take(1)).subscribe(loading => {
			this.isLoading = loading;
		});
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	}

	onSubmit(form: NgForm) {
		this.authService.registerUser({
			email: form.value.email,
			password: form.value.password,
		});
	}
}
