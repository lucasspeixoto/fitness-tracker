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
	finishedExercisesChanged = new Subject<Exercise[]>();

	private availableExercises: Exercise[] = [];
	private runningExercise: Exercise;
	private finishedExercises: Exercise[] = [];
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
    //this.angularFirestore.doc(`availableExercises/${selectedId}`).update({lastSelected: new Date()});
		this.runningExercise = this.availableExercises.find(
			exercice => exercice.id === selectedId,
		);
		this.exerciseChanged.next({ ...this.runningExercise });
	}

	getRunningExercise() {
		return { ...this.runningExercise };
	}

	completeExercise() {
		this.addDataToDatabase({
			...this.runningExercise,
			date: new Date(),
			state: 'completed',
		});
		this.runningExercise = null;
		this.exerciseChanged.next(null);
	}

	cancelExercise(progress: number) {
		this.addDataToDatabase({
			...this.runningExercise,
			duration: this.runningExercise.duration * (progress / 100),
			calories: this.runningExercise.calories * (progress / 100),
			date: new Date(),
			state: 'cancelled',
		});
		this.runningExercise = null;
		this.exerciseChanged.next(null);
	}

	fetchCompletedOrCancelledExercises() {
		this.angularFirestore
			.collection('finishedExercises')
			.valueChanges()
			.subscribe((exercises: Exercise[]): void => {
				this.finishedExercises = exercises;
				this.finishedExercisesChanged.next([...this.finishedExercises]);
			});
	}

	private addDataToDatabase(exercise: Exercise) {
		this.angularFirestore.collection('finishedExercises').add(exercise);
	}
}
