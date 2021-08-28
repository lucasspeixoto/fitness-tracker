import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from 'src/app/training/training.service';
import { Exercise } from '../exercise.model';
import { Observable, Subscription } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {
	exercises: Exercise[];

	isLoading$: Observable<boolean>;

	private exerciseSubscription: Subscription;
	private loadingSubscription: Subscription;

	constructor(
		private trainingService: TrainingService,
		private uiService: UiService,
		private store: Store<fromRoot.State>,
	) {}

	ngOnInit() {
		this.isLoading$ = this.store.select(fromRoot.getIsLoading);
		/* this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
			loading => {
				this.isLoading = loading;
			},
		); */
		this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
			exercises => {
				this.exercises = exercises;
			},
		);
		this.fetchExercises();
	}

	fetchExercises() {
		this.trainingService.fetchAvailableExercises();
	}

	onStartTraining(form: NgForm) {
		this.trainingService.startExercise(form.value.exercise);
	}

	ngOnDestroy() {
		if (this.exerciseSubscription) {
			this.exerciseSubscription.unsubscribe();
		}
		/* if (this.loadingSubscription) {
			this.loadingSubscription.unsubscribe();
		} */
	}
}
