import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../views/common-component/confirm-dialog/confirm-dialog.component';

import { MatDialog, MatDialogConfig } from "@angular/material/dialog";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
      public dialog: MatDialog
  ) { }
  dialogConfig = new MatDialogConfig();

  public confirmDialog(data) {
    this.dialogConfig.data = data
    this.dialogConfig.width = '100%';
    this.dialog.open(ConfirmDialogComponent, this.dialogConfig);
  }
}
