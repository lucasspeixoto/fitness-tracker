import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, NgForm } from '@angular/forms';
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
	exercises: any; //Exercise[] = [];

	constructor(
		private trainingService: TrainingService,
		private angularFireDatabase: AngularFireDatabase,
		private angularFirestore: AngularFirestore,
	) {}

	ngOnInit() {
		this.angularFireDatabase
			.list('/availableExercises')
			.valueChanges()
			.subscribe(data => {
				console.log(data);
			});
	}

	onStartTraining(form: NgForm) {
		this.trainingService.startExercise(form.value.exercise);
	}
}
