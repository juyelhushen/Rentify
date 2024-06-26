import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrl: './seller-details.component.css'
})
export class SellerDetailsComponent {
  constructor(
    public dialogRef: MatDialogRef<SellerDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
  ) {}
}
