import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomMaterialModule } from './custom-material/custom-material.module';
import { AddComputerComponent } from './add-computer/add-computer.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CustomNgxModule } from './custom-ngx-bootstrap/custom-ngx-bootstrap.module';
import { EditComputerComponent } from './edit-computer/edit-computer.component';
import { DataTablesModule } from 'angular-datatables';

import { GridModule, EditService, ToolbarService, SortService } from '@syncfusion/ej2-angular-grids';
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		DashboardComponent,
		AddComputerComponent,
		EditComputerComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		CommonModule,
		HttpClientModule,
		BrowserAnimationsModule,
		CustomMaterialModule,
		FormsModule,
		ReactiveFormsModule,
		CustomNgxModule,
		DataTablesModule,
		GridModule,
		ToolbarModule
	],
	providers: [HttpClientModule, GridModule, ToolbarService, EditService, ToolbarService, SortService],
	bootstrap: [AppComponent],
	entryComponents: [AddComputerComponent, EditComputerComponent]
})
export class AppModule { }
