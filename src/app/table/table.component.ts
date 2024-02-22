import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { MatDialog } from '@angular/material/dialog';
import { EnumLanguage } from '../shared/enumLanguage';
import { CategoryWord } from '../shared/categoryWord';
import { Translation } from '../shared/translation';
import { CategoryServiceService } from '../categoryService.service';
import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { HeaderComponent } from "../header/header.component";
import { DeleteCategoryComponent } from '../deleteCategory/deleteCategory.component';

@Component({
    selector: 'app-table',
    standalone: true,
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
    imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatSortModule, RouterLink, FooterComponent, HeaderComponent]
})
export class TableComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'words', 'last_change_date', 'actions'];
  myData = new MatTableDataSource(this.cS.list());
  dataSource!: CdkTableDataSourceInput<CategoryWord>;
   
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cS: CategoryServiceService, private router: Router, private dialog: MatDialog) {
    this.sort = new MatSort();
  }

 

  ngAfterViewInit() {
    this.myData.sort = this.sort;
    this.refreshData();
  }

  deleteItem(itemToRemove: CategoryWord): void {
    const deleteDialog = this.dialog.open(DeleteCategoryComponent, {
      data: { categoryName: itemToRemove.name },
    });

    deleteDialog.afterClosed().subscribe(result => {
      if (result == true) {
        this.cS.delete(itemToRemove.id);
        this.refreshData();
      }
    });
  }

  editItem(itemToEdit: CategoryWord): void {
    this.router.navigate(['add-category/' + itemToEdit.id]);
  }

  newCategory(): void {
    console.log("adding test item");
    let newItem = new CategoryWord("test", this.myData.data.length + 1,
      new Date(), EnumLanguage.English, EnumLanguage.Hebrew,
      [new Translation("", "")]);

    this.cS.add(newItem);
    this.refreshData();
  }

  refreshData(){
    this.myData = new MatTableDataSource(this.cS.list());
  }
}


