import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-address-dialog',
  templateUrl: './address-dialog.component.html',
  styleUrls: ['./address-dialog.component.scss']
})
export class AddressDialogComponent implements OnInit {

  constructor(private dialogRef :MatDialogRef<AddressDialogComponent>) { }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialogRef.close();
  }

}
