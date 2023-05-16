import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SpinnerDialogComponent } from '../spinner-dialog/spinner-dialog.component';

@Component({
    template: ''
})
export class AppBaseComponent implements OnDestroy {

    // @ts-ignore
    protected dialogRef: MatDialogRef<SpinnerDialogComponent>;

    constructor(protected dialog: MatDialog) {

    }

    ngOnDestroy(): void {
        if (this.dialogRef) {
            this.dialogRef.close();
        }
    }

    showSpinner(message?: string) {
        if (!message) {
            message = '';
        }
        this.dialogRef = this.dialog.open(SpinnerDialogComponent, {
            panelClass: 'transparent',
            disableClose: true,
            data: message
        });
    }

    closeSpinner() {
        if (this.dialogRef) {
            this.dialogRef.close();
        } else {
            console.error('dialog is undefined');
        }
    }
}
