import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	isDarkTheme: boolean;

	@Output() sidenavToggle = new EventEmitter<void>();

	@Output() themeChange = new EventEmitter<void>();

	isAuth$: Observable<boolean>;
	authSubscription: Subscription;

	constructor(
		public authService: AuthService,
		private store: Store<fromRoot.State>,
	) {
		let theme = localStorage.getItem('theme');
		this.isDarkTheme = theme === 'Dark' ? true : false;
	}

	ngOnInit() {
		this.isAuth$ = this.store.select(fromRoot.getIsAuth);
	}

	onToggleSidenav() {
		this.sidenavToggle.emit();
	}

	onLogout() {
		this.authService.logout();
	}

	storeThemeSelection() {
		localStorage.setItem('theme', this.isDarkTheme ? 'Dark' : 'Light');
		this.themeChange.emit();
	}
}
