import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { TrainingService } from 'src/app/shared/services/training.service';
import { Exercise } from './../../shared/models/exercise.model';

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

	exercises: Exercise[] = [];

	constructor(private trainingService: TrainingService) {}

	ngOnInit() {
		this.exercises = this.trainingService.getAvailableExercises();
	}

	onStartTraining() {
		this.trainingStart.emit();
	}
}
