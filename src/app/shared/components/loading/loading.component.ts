import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-loading',
	template: `
		<div class="spinner-container">
			<mat-spinner
				[style]="{ width: '100px', height: '100px' }"
				styleClass="custom-spinner"
				strokeWidth="8"
				fill="#e0efef"
				animationDuration="1s"
			></mat-spinner>
		</div>
	`,
	styles: [
		`
			.spinner-container {
				position: fixed;
				top: 0;
				bottom: 0;
				left: 0;
				right: 0;
				padding: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background: rgba(0, 0, 0, 0.32);
				z-index: 20000;
			}
		`,
	],
})
export class LoadingComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
