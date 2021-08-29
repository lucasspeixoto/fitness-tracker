import { NgModule } from '@angular/core';
import { LoadingComponent } from '../components/loading/loading.component';
import { SharedModule } from '../shared/shared.module';
import { Store, StoreModule } from '@ngrx/store';

import { CurrentTrainingComponent } from './current-training/current-training.component';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingsComponent } from './past-trainings/past-trainings.component';
import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { trainingReducer } from './training.reducer';

@NgModule({
	declarations: [
		TrainingComponent,
		CurrentTrainingComponent,
		StopTrainingComponent,
		NewTrainingComponent,
		PastTrainingsComponent,
		LoadingComponent,
	],
	imports: [
		SharedModule,
		TrainingRoutingModule,
		StoreModule.forFeature('training', trainingReducer),
	],
})
export class TrainingModule {}
