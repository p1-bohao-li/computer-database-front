import { Component, OnInit, OnDestroy, Inject, ViewChild, ViewEncapsulation } from '@angular/core';
import { ComputerService } from 'app/service/computer.service';
import { SortService, GridComponent, GridLine, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { addClass, removeClass } from '@syncfusion/ej2-base';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
	public data: Object[] = [];
	public editSettings: EditSettingsModel;
	public toolbar: ToolbarItems[];
	@ViewChild('grid', { static: false })
	public grid: GridComponent;


	constructor(private computerService: ComputerService) {
		this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' };
		this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
	}

	public ngOnInit(): void {
		this.computerService.getComputers().subscribe(
			data => {
				data.forEach(computer => {
					this.convertTimestamp(computer, "introduced");
					this.convertTimestamp(computer, "discontinued")
					// this.addCompanyName(computer)
				});
				this.data = data;
			}
		)
	}

	public convertTimestamp(object: any, attribute: string): void {
		const timestamp = object[attribute];
		if (timestamp) {
			const date = new Date(timestamp);
			object[attribute] = date.toISOString().slice(0, 10);

		}
	}

	// public addCompanyName(computer: any): void {
	// 	const companyModel = computer["companyModel"]
	// 	if (companyModel) {
	// 		computer["company"] = companyModel["name"]
	// 	}
	// }

	public actionBegin(e: any) {
		console.log("event: ", e);
	}
}

