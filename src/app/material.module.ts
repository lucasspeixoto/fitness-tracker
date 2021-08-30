import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from "@angular/material/menu";

@NgModule({
	imports: [
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatCardModule,
		MatCheckboxModule,
		MatButtonModule,
		MatSnackBarModule,
		HttpClientModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatDialogModule,
		MatIconModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTabsModule,
		MatSelectModule,
		MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatMenuModule
	],
	exports: [
		MatToolbarModule,
		MatSidenavModule,
		MatListModule,
		MatCardModule,
		MatCheckboxModule,
		MatButtonModule,
		MatSnackBarModule,
		HttpClientModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatTableModule,
		MatPaginatorModule,
		MatSortModule,
		MatDialogModule,
		MatIconModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatTabsModule,
		MatSelectModule,
		MatProgressSpinnerModule,
    MatSlideToggleModule,
    MatMenuModule
	],
})
export class MaterialModule {}
