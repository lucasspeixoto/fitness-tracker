import { Component, OnInit, EventEmitter, Output } from '@angular/core';

/**
 * @title Basic select with initial value and no form
 */

@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
	@Output() trainingStart = new EventEmitter<void>();

	constructor() {}

	ngOnInit(): void {}

	onStartTraining() {
		this.trainingStart.emit();
	}
}
