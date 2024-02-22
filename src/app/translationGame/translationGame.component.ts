import { CommonModule, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CategoryWord } from '../shared/categoryWord';
import { TranslationWord } from '../shared/translationWord';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { CategoryServiceService } from '../categoryService.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-translation-game',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, NgFor, CommonModule, MatButtonModule, MatInputModule,
    MatSelectModule, MatFormFieldModule, MatOptionModule, FormsModule, MatIconModule,
    MatTableModule,],
  templateUrl: './translationGame.component.html',
  styleUrl: './translationGame.component.css',
})

export class TranslationGameComponent implements OnInit {
  category!: CategoryWord;
  trasnlationWords: TranslationWord[] = [];
  displayedColumns: string[] = ["origin-col", "translation-col", "is-right-col"];
  isClicked: boolean = false;
  checkMessage: string = "";
  isShowTranslation: boolean = false;

  constructor(private categoryServiceService: CategoryServiceService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.category = this.categoryServiceService.get(parseInt(id));

      for (let index = 0; index < this.category.words.length; index++) {
        const wordToTranslate = this.category.words[index];
        this.trasnlationWords.push(new TranslationWord(wordToTranslate.origin, wordToTranslate.target, "", false));
      }
    };
  }

  Check() {
    this.isClicked = true;

    let rightGuess = 0;
    for (let index = 0; index < this.trasnlationWords.length; index++) {
      const singleWord = this.trasnlationWords[index];
      singleWord.isRight = singleWord.guess == singleWord.target;
      if (singleWord.isRight){
        rightGuess++;
      }
    }

    if (rightGuess == this.trasnlationWords.length) {
      this.checkMessage = "Well done, You finished!!!";
    } else {
      this.checkMessage = `You have translated ${rightGuess} out of ${this.trasnlationWords.length} words correctly, try again`;
    }
  }
}

