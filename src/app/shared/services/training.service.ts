import { Injectable } from '@angular/core';
import {
	AngularFirestore,
	AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Exercise } from './../models/exercise.model';

@Injectable()
export class TrainingService {
	exerciseChanged = new Subject<Exercise>();

	exercisesChanged = new Subject<Exercise[]>();

	private availableExercises: Exercise[] = [];
	private runningExercise: Exercise;
	private exercises: Exercise[] = [];
	private exerciseCollection: AngularFirestoreCollection<Exercise>;

	constructor(private angularFirestore: AngularFirestore) {}

	fetchAvailableExercises() {
		this.exerciseCollection =
			this.angularFirestore.collection<Exercise>('availableExercises');
		this.exerciseCollection
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
			.subscribe((exercises: Exercise[]) => {
				this.availableExercises = exercises;
				this.exercisesChanged.next([...this.availableExercises]);
			});
	}

	startExercise(selectedId: string) {
		this.runningExercise = this.availableExercises.find(
			exercice => exercice.id === selectedId,
		);
		this.exerciseChanged.next({ ...this.runningExercise });
	}

	getRunningExercise() {
		return { ...this.runningExercise };
	}

	completeExercise() {
		this.exercises.push({
			...this.runningExercise,
			date: new Date(),
			state: 'completed',
		});
		this.runningExercise = null;
		this.exerciseChanged.next(null);
	}

	cancelExercise(progress: number) {
		this.exercises.push({
			...this.runningExercise,
			duration: this.runningExercise.duration * (progress / 100),
			calories: this.runningExercise.calories * (progress / 100),
			date: new Date(),
			state: 'cancelled',
		});
		this.runningExercise = null;
		this.exerciseChanged.next(null);
	}

	getCompletedOrCancelledExercises() {
		return [...this.exercises];
	}
}
