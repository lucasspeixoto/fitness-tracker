import { Injectable } from '@angular/core';
import {
	MatSnackBar,
	MatSnackBarHorizontalPosition,
	MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable()
export class UiService {
	horizontalPosition: MatSnackBarHorizontalPosition = 'center';
	verticalPosition: MatSnackBarVerticalPosition = 'top';

	constructor(private matSnackBar: MatSnackBar) {}

	showMessage(message: string, action: string, duration?: number) {
		this.matSnackBar.open(message, action, {
			panelClass: 'snack',
			duration: duration | 1500,
			horizontalPosition: this.horizontalPosition,
			verticalPosition: this.verticalPosition,
		});
	}
}
