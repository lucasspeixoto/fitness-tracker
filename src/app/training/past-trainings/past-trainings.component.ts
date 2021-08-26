import {
	AfterViewInit,
	Component,
	OnDestroy,
	OnInit,
	ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TrainingService } from 'src/app/shared/services/training.service';
import { Exercise } from '../../shared/models/exercise.model';

@Component({
	selector: 'app-past-trainings',
	templateUrl: './past-trainings.component.html',
	styleUrls: ['./past-trainings.component.css'],
})
export class PastTrainingsComponent
	implements OnInit, AfterViewInit, OnDestroy
{
	displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
	dataSource = new MatTableDataSource<Exercise>();

	private finishedExercisesSubscription: Subscription;

	@ViewChild(MatSort) sort: MatSort;
	@ViewChild(MatPaginator) paginator: MatPaginator;

	constructor(private trainingService: TrainingService) {}

	ngOnInit(): void {
		this.finishedExercisesSubscription =
			this.trainingService.finishedExercisesChanged.subscribe(
				(exercises: Exercise[]) => {
					this.dataSource.data = exercises;
				},
			);
		this.trainingService.fetchCompletedOrCancelledExercises();
	}

	ngAfterViewInit(): void {
		this.dataSource.sort = this.sort;
		this.dataSource.paginator = this.paginator;
	}

	doFilter(filterInputValue: string) {
		this.dataSource.filter = filterInputValue.trim().toLowerCase();
	}

	ngOnDestroy() {
		this.finishedExercisesSubscription.unsubscribe();
	}
}
