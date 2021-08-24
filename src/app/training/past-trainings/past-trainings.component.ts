import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from 'src/app/shared/services/training.service';
import { Exercise } from '../../shared/models/exercise.model';

@Component({
	selector: 'app-past-trainings',
	templateUrl: './past-trainings.component.html',
	styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent implements OnInit {
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Exercise>();

	constructor(private trainingService: TrainingService) {}

	ngOnInit(): void {
		this.dataSource.data =
			this.trainingService.getCompletedOrCancelledExercises();
	}
}
