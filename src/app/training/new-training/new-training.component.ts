import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TrainingService } from 'src/app/training/training.service';
import { Exercise } from '../exercise.model';
import { Observable } from 'rxjs';
import { UiService } from 'src/app/shared/ui.service';
import * as fromRoot from '../../app.reducer';
import * as fromTraining from '../training.reducer';
import { Store } from '@ngrx/store';
@Component({
	selector: 'app-new-training',
	templateUrl: './new-training.component.html',
	styleUrls: ['./new-training.component.css'],
})
export class NewTrainingComponent implements OnInit {

	exercises$: Observable<Exercise[]>;

	isLoading$: Observable<boolean>;

	constructor(
		private trainingService: TrainingService,
		private uiService: UiService,
		private store: Store<fromTraining.State>,
	) {}

	ngOnInit() {
		this.isLoading$ = this.store.select(fromRoot.getIsLoading);
		/* this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(
			loading => {
				this.isLoading = loading;
			},
		); */
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises)
		/* this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
			exercises => {
				this.exercises = exercises;
			},
		); */
		this.fetchExercises();
	}

	fetchExercises() {
		this.trainingService.fetchAvailableExercises();
	}

	onStartTraining(form: NgForm) {
		this.trainingService.startExercise(form.value.exercise);
	}

}
