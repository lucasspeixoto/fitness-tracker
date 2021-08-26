import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/shared/services/training.service';
import { Exercise } from './../../shared/models/exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
	exercises: Exercise[];

	exerciseSubscription: Subscription;

	constructor(private trainingService: TrainingService) {}

	ngOnInit() {
		this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
			(exercises: Exercise[]): void => {
				this.exercises = exercises;
			},
		);
		this.trainingService.fetchAvailableExercises();
	}

	onStartTraining(form: NgForm) {
		this.trainingService.startExercise(form.value.exercise);
	}

	ngOnDestroy() {
		this.exerciseSubscription.unsubscribe();
	}
}
