import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TrainingService } from 'src/app/shared/services/training.service';
import { Exercise } from '../../shared/models/exercise.model';

@Component({
	selector: 'app-past-trainings',
	templateUrl: './past-trainings.component.html',
	styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Exercise>();

	@ViewChild(MatSort) sort: MatSort;

	constructor(private trainingService: TrainingService) {}

	ngOnInit(): void {
		this.dataSource.data =
			this.trainingService.getCompletedOrCancelledExercises();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
	}

	doFilter(filterInputValue: string) {
		this.dataSource.filter = filterInputValue.trim().toLowerCase();
	}
}
