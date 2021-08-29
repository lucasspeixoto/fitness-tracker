import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { Exercise } from 'src/app/training/exercise.model';
import { TrainingService } from 'src/app/training/training.service';
import { StopTrainingComponent } from './stop-training.component';
import * as fromTraining from '../training.reducer';
import { take } from 'rxjs/operators';

@Component({
	selector: 'app-current-training',
	templateUrl: './current-training.component.html',
	styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
	progress: number = 0;
	timer: any;

	constructor(
		private dialog: MatDialog,
		private trainingService: TrainingService,
		private store: Store<fromTraining.State>,
	) {}

	ngOnInit() {
		this.startOrResumeTimer();
	}

	startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.trainingService.completeExercise();
          clearInterval(this.timer);
        }
      }, step);
    });
  }

	startAgain() {
		this.progress = 0;
		this.startOrResumeTimer();
	}

	onStop() {
		clearInterval(this.timer);
		const dialogRef = this.dialog.open(StopTrainingComponent, {
			data: {
				progress: this.progress,
			},
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.trainingService.cancelExercise(this.progress);
			} else {
				this.startOrResumeTimer();
			}
		});
	}
}
