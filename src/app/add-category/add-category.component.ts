import { CommonModule, NgFor } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import {EnumLanguage } from '../shared/enumLanguage';
import { CategoryWord } from '../shared/categoryWord';
import { Translation } from '../shared/translation';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryServiceService } from '../categoryService.service';

@Component({
standalone: true,
selector: 'app-add-category',
templateUrl: './add-category.component.html',
styleUrls: ['./add-category.component.css'],
imports: [FooterComponent, FormsModule, CommonModule, NgFor, MatIconModule, MatFormFieldModule,MatInputModule, MatButtonModule, MatMenuModule, MatToolbarModule,HeaderComponent,]
})


export class addCategoryComponent {
  categoryToEdit: CategoryWord = new CategoryWord("", 0, new Date(), EnumLanguage.Hebrew, EnumLanguage.English,[new Translation("", "")]);
  constructor(private route: ActivatedRoute,private cS:CategoryServiceService, private router: Router) {
    let id = this.route.snapshot.paramMap.get('id');
   
    if (id != null) {
      let idAsNumber = parseInt(id);
      let CategoryWord = cS.get(idAsNumber);
      if (CategoryWord != null) {
        this.categoryToEdit = CategoryWord;
      }
    }
  }

  AddNewWord() {
    this.categoryToEdit.words.push(new Translation("", ""));
  }

  deleteItem(translatedWord: Translation) {
    let newArr = this.categoryToEdit.words.filter(item => item !== translatedWord);
    this.categoryToEdit.words = newArr;
  }

  save() {
    if (this.categoryToEdit.id == 0) {
      this.cS.add(this.categoryToEdit);
    }

    this.router.navigate(['']);
  }
}

