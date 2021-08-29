import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from 'src/app/auth/auth.service';
import * as fromRoot from '../../app.reducer';
@Component({
	selector: 'app-sidenav-list',
	templateUrl: './sidenav-list.component.html',
	styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit {
	@Output() closeSidenav = new EventEmitter<void>();

	isAuth$: Observable<boolean>;
	authSubscription: Subscription;

	constructor(
		private authService: AuthService,
		private store: Store<fromRoot.State>,
	) {}

	ngOnInit() {
		this.isAuth$ = this.store.select(fromRoot.getIsAuth);
	}

	onClose() {
		this.closeSidenav.emit();
	}

	onLogout() {
		this.onClose();
		this.authService.logout();
	}
}
