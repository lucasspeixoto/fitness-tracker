import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

	constructor(private dialog: MatDialog) {}

	ngOnInit() {
		this.startOrResumeTimer();
	}

	startOrResumeTimer() {
		this.timer = setInterval(() => {
			this.progress = this.progress + 5;
			if (this.progress >= 100) {
				clearInterval(this.timer);
			}
		}, 1000);
	}

  startAgain() {
    this.progress = 0
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
