import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';

export interface deleteCategory {
  categoryName: string;
}

@Component({
  selector: 'app-delete-category',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButtonModule,MatDialogClose],
  templateUrl: './deleteCategory.component.html',
  styleUrl: './deleteCategory.component.css'
})
export class DeleteCategoryComponent {


  constructor(@Inject(MAT_DIALOG_DATA) public data: deleteCategory) {
  }
}
