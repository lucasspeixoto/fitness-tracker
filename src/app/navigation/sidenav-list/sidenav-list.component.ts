import {
	Component,
	EventEmitter,
	OnDestroy,
	OnInit,
	Output,
} from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-sidenav-list',
	templateUrl: './sidenav-list.component.html',
	styleUrls: ['./sidenav-list.component.css'],
})
export class SidenavListComponent implements OnInit, OnDestroy {
	@Output() closeSidenav = new EventEmitter<void>();

	isAuth: boolean = false;
	authSubscription: Subscription;

	constructor(private authService: AuthService) {}

	ngOnInit(): void {
		this.authSubscription = this.authService.authChange.subscribe(
			authStatus => {
				this.isAuth = authStatus;
			},
		);
	}

	onClose() {
		this.isAuth = true;
		this.closeSidenav.emit();
	}

	ngOnDestroy() {
		this.authSubscription.unsubscribe();
	}
}
