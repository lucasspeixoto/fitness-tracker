import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';

@NgModule({
	declarations: [
		TrainingComponent,
		CurrentTrainingComponent,
		StopTrainingComponent,
		NewTrainingComponent,
		PastTrainingsComponent,
	],
	imports: [
		SharedModule,
		TrainingRoutingModule,
	],
})
export class TrainingModule {}
