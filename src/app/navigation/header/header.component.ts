import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
	selector: 'header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
	@Output() sidenavToggle = new EventEmitter<void>();

	constructor() {}

	ngOnInit(): void {}

	onToggleSidenav() {
		this.sidenavToggle.emit();
	}
}
