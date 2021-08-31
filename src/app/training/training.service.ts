import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Subject, Subscription } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { Exercise } from './exercise.model';
import { UiService } from '../shared/ui.service';
import * as UI from '../shared/ui.actions';
import * as Training from './training.actions';
import * as fromTraining from './training.reducer';
import { User } from '../auth/user.model';
@Injectable()
export class TrainingService {
	exerciseChanged = new Subject<Exercise>();
	exercisesChanged = new Subject<Exercise[]>();
	finishedExercisesChanged = new Subject<Exercise[]>();

	user: User;

	private availableExercises: Exercise[] = [];
	private runningExercise: Exercise;
	private firebaseSubscription: Subscription[] = [];

	constructor(
		private angularFirestore: AngularFirestore,
		private uiService: UiService,
		private store: Store<fromTraining.State>,
	) {
		this.user = JSON.parse(localStorage.getItem('user'));
	}

	fetchAvailableExercises() {
		this.store.dispatch(new UI.StartLoading());
		this.firebaseSubscription.push(
			this.angularFirestore
				.collection('availableExercises')
				.snapshotChanges()
				.pipe(
					map(actions =>
						actions.map(a => {
							const data = a.payload.doc.data() as Exercise;
							const id = a.payload.doc.id;
							return { id, ...data };
						}),
					),
				)
				.subscribe(
					(exercises: Exercise[]) => {
						this.store.dispatch(new UI.StopLoading());
						this.store.dispatch(new Training.SetAvailableTrainings(exercises));
					},
					error => {
						this.store.dispatch(new UI.StopLoading());
						this.uiService.showMessage(
							'Fetching Exercises failed, please contact administrator (19 98262-1117)',
							null,
							5000,
						);
						this.exercisesChanged.next(null);
					},
				),
		);
	}

	startExercise(selectedId: string) {
		this.store.dispatch(new Training.StartTraining(selectedId));
		//this.angularFirestore.doc(`availableExercises/${selectedId}`).update({lastSelected: new Date()});
		this.runningExercise = this.availableExercises.find(
			exercise => exercise.id === selectedId,
		);
		this.exerciseChanged.next({ ...this.runningExercise });
	}

	completeExercise() {
		this.store
			.select(fromTraining.getActiveTraining)
			.pipe(take(1))
			.subscribe(exercise => {
				this.addDataToDatabase({
					...exercise,
					date: new Date(),
					state: 'completed',
				});
				this.store.dispatch(new Training.StopTraining());
			});
	}

	cancelExercise(progress: number) {
		this.store
			.select(fromTraining.getActiveTraining)
			.pipe(take(1))
			.subscribe(exercise => {
				this.addDataToDatabase({
					...exercise,
					duration: exercise.duration * (progress / 100),
					calories: exercise.calories * (progress / 100),
					date: new Date(),
					state: 'cancelled',
				});
				this.store.dispatch(new Training.StopTraining());
			});
	}

	fetchCompletedOrCancelledExercises() {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.firebaseSubscription.push(
			this.angularFirestore
				.collection(`users/${this.user.userId}/exercises`)
				.valueChanges()
				.subscribe((exercises: Exercise[]) => {
					this.store.dispatch(new Training.SetFinishedTrainings(exercises));
				}),
		);
	}

	cancelSubscriptions() {
		this.firebaseSubscription.forEach(subscription =>
			subscription.unsubscribe(),
		);
	}

	private addDataToDatabase(exercise: Exercise) {
		this.user = JSON.parse(localStorage.getItem('user'));
		this.angularFirestore
			.collection(`users/${this.user.userId}/exercises`)
			.add(exercise);
	}
}
