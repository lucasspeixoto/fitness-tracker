import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from 'src/app/shared/services/training.service';
import { Exercise } from './../../shared/models/exercise.model';

@Component({
	selector: 'app-past-training',
	templateUrl: './past-training.component.html',
	styleUrls: ['./past-training.component.css'],
})
export class PastTrainingComponent implements OnInit {
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Exercise>();

	constructor(private trainingService: TrainingService) {}

	ngOnInit(): void {
		this.dataSource.data =
			this.trainingService.getCompletedOrCancelledExercises();
	}
}
