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
}
