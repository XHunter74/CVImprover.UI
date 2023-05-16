import { Component, Optional, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'enter-prompt',
    templateUrl: './enter-prompt.component.html',
    styleUrls: ['./enter-prompt.component.css'],
})


export class EnterPromptComponent implements OnInit {

    data: string = '';

    recordForm = new UntypedFormGroup({
        promptField: new UntypedFormControl('',
            [Validators.required]),
    });


    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) public componentData: string,
        @Optional() private readonly dialogRef: MatDialogRef<string>,
    ) {
        if (!componentData) {
            componentData = '';
        }
        this.data = componentData;
    }

    static async show(dialog: MatDialog, data?: string): Promise<string> {
        const dialogRef = dialog.open(EnterPromptComponent, {
            width: '700px',
            height: '200px',
            maxHeight: '700px',
            data
        });
        const dialogData = (await dialogRef.afterClosed().toPromise()) as string;
        return dialogData;
    }

    ngOnInit(): void {
        this.recordForm.patchValue({
            promptField: this.data
        });
    }

    saveItem() {
        this.data = this.promptField?.value;
        this.dialogRef.close(this.data);
    }

    get promptField() { return this.recordForm.get('promptField'); }
}
