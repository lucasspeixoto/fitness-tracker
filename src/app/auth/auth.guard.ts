import { Injectable } from '@angular/core';
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
	CanLoad,
	Route,
} from '@angular/router';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
	constructor(private authService: AuthService, private router: Router) {}

	/* canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this.authService.isAuth()) {
			return true;
		} else {
			setTimeout(() => {
				this.router.navigate(['/login']);
			}, 2500);
		}
	} */

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot,
	): Observable<boolean> | Promise<boolean> | boolean {
		if (this.authService.isAuth()) {
			return true;
		} else {
			this.router.navigate(['login']);
		}
	}

	canLoad(route: Route) {
		if (this.authService.isAuth() != 'yes') {
			this.router.navigate(['/login']);
		}
		return true;
	}
}
