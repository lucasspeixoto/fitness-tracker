import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { AuthService } from 'src/app/shared/services/auth.service';
import { UiService } from 'src/app/shared/services/ui.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;

	isLoading: boolean = false;

	constructor(private authService: AuthService, private uiService: UiService) {}

	ngOnInit() {
		this.uiService.loadingStateChanged.pipe(take(1)).subscribe(loading => {
			this.isLoading = loading;
		});
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
}
