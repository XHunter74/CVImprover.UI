import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './services/data.service';
import { FileModel } from './models/file.model';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AppBaseComponent } from './base-component/app-base.component';
import { MatDialog } from '@angular/material/dialog';
import { EnterPromptComponent } from './enter-prompt/enter-prompt.component';
import { PromptRequest } from './models/prompt-request.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent extends AppBaseComponent implements OnInit {
  title = 'CVImprover';
  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  sortedData = new MatTableDataSource();
  displayedColumns: string[] = ['fileId', 'fileName', 'buttons'];

  constructor(
    private dataService: DataService,
    dialog: MatDialog) {
    super(dialog);
  }

  async ngOnInit() {
    await this.refreshData();
  }

  async refreshData() {
    setTimeout(async () => {
      this.showSpinner();
      const data = await this.dataService.getCvFiles();
      this.sortedData.data = data;
      console.log(data);
      this.closeSpinner();
    });
  }

  sortData(sort: Sort): void {

  }

  async editRecord(fileId: number) {
    const dialogResult = await EnterPromptComponent.show(this.dialog, '');
    console.log(dialogResult);
    if (dialogResult && dialogResult !== '') {
      this.showSpinner();
      const promptRequest = new PromptRequest();
      promptRequest.DocumentId = fileId;
      promptRequest.Prompt = dialogResult;
      const modifiedDocument = await this.dataService.sendPrompt(promptRequest);
      console.log(modifiedDocument);
      this.closeSpinner();
      window.open(modifiedDocument, "_blank");
    }
  }
}
