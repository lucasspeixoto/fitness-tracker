import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
	CanLoad,
	Route,
} from '@angular/router';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private authService: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.isAuth()) {
			return true;
		} else {
			setTimeout(() => {
				this.router.navigate(['/login']);
			}, 2500);
		}
	}

	canLoad(route: Route) {
		if (this.authService.isAuth()) {
			return true;
		} else {
			setTimeout(() => {
				this.router.navigate(['/login']);
			}, 2500);
		}
	}
}
