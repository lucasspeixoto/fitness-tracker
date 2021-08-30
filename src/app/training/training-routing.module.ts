import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrainingComponent } from './training.component';

const trainingRoutes: Routes = [{ path: '', component: TrainingComponent }];

@NgModule({
	imports: [RouterModule.forChild(trainingRoutes)],
	exports: [RouterModule],
})
export class TrainingRoutingModule {}
