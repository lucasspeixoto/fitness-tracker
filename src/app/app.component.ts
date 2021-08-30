import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';
@Component({
	selector: 'root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isDarkTheme: boolean;

	constructor(private authService: AuthService) {
    let theme = localStorage.getItem('theme')
    this.isDarkTheme = theme === 'Dark' ? true : false
  }

	ngOnInit() {
		this.authService.initAuthListener();

	}

  themeChange() {
    this.isDarkTheme = !this.isDarkTheme
  }
}
