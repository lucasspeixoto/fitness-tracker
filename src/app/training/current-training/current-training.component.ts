import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Exercise } from 'src/app/shared/models/exercise.model';
import { TrainingService } from 'src/app/shared/services/training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
	selector: 'app-current-training',
	templateUrl: './current-training.component.html',
	styleUrls: ['./current-training.component.css'],
})
export class CurrentTrainingComponent implements OnInit {
	@Output() trainingExit = new EventEmitter();
	progress: number = 0;
	timer;

	exerciseSubscription: Subscription;
	runningExercise: Exercise;

	constructor(
		private dialog: MatDialog,
		private trainingService: TrainingService,
	) {}

	ngOnInit() {
		this.runningExercise = this.trainingService.getRunningExercise();
		this.startOrResumeTimer();
	}

	startOrResumeTimer() {
		const increment = (this.runningExercise.duration / 100) * 1000;
    console.log(increment)
		this.timer = setInterval(() => {
			this.progress = this.progress + 1;
			if (this.progress >= 100) {
				clearInterval(this.timer);
			}
		}, increment);
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
				this.trainingExit.emit();
			} else {
				this.startOrResumeTimer();
			}
		});
	}
}
