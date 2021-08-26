import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';

@Component({
	selector: 'root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	constructor(private authService: AuthService) {}

	ngOnInit() {
		this.authService.initAuthListener();
	}
}
