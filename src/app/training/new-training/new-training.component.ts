import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/training/training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import { take } from 'rxjs/operators';
@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit, OnDestroy {
	exercises: Exercise[];

	private exerciseSubscription: Subscription;

	isLoading: boolean = true;

	private loadingSubscription: Subscription;

	constructor(
		private trainingService: TrainingService,
		private uiService: UiService,
	) {}

	ngOnInit() {
		this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
			loading => {
				this.isLoading = loading;
			},
		);
		this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
			(exercises: Exercise[]) => {
				this.exercises = exercises;
        console.log('Obteve')
			},
		);
		this.fetchExercises()
	}

  fetchExercises() {
    this.trainingService.fetchAvailableExercises()
  }

	onStartTraining(form: NgForm) {
		this.trainingService.startExercise(form.value.exercise);
	}

	ngOnDestroy() {
		if (this.exerciseSubscription) {
			this.exerciseSubscription.unsubscribe();
		}
		if (this.loadingSubscription) {
			this.loadingSubscription.unsubscribe();
		}
	}
}
