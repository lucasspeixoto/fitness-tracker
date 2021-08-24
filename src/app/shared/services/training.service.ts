import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Exercise } from './../models/exercise.model';

@Injectable()
export class TrainingService {
	exerciseChanged = new Subject<Exercise>();

	availableExercises: Exercise[] = [
		{ id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
		{ id: 'touch-toes', name: 'Touch Toes', duration: 180, calories: 15 },
		{ id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18 },
		{ id: 'burpees', name: 'Burpees', duration: 60, calories: 8 },
	];

	private runningExercise: Exercise;
	private exercises: Exercise[] = [];

	getAvailableExercises() {
		return this.availableExercises.slice(); //slice() create a new array for not change the original
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
