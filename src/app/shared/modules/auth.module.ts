import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SignupComponent } from './../../auth/signup/signup.component';
import { LoginComponent } from './../../auth/login/login.component';

import { MaterialModule } from './material.module';

@NgModule({
	declarations: [SignupComponent, LoginComponent],
	imports: [
		CommonModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
    FlexLayoutModule
	],

	exports: [],
})
export class AuthModule {}
