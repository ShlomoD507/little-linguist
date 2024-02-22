import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryWord } from '../shared/categoryWord';
import { GameWords } from '../shared/gameWords';
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
  CategoryWord!: CategoryWord;
  gameWords: GameWords[] = [];
  displayedColumns: string[] = ["origin-col", "userinput-col", "is-corect-col"];
  isCheckedButtonWasClicked: boolean = false;
  checkMessage: string = "";
  isShowTranslation: boolean = false;

  constructor(private cs: CategoryServiceService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    let id = this.activatedRoute.snapshot.paramMap.get("id");
    if (id != null) {
      this.CategoryWord = this.cs.get(parseInt(id));

      this.CategoryWord.words.forEach(translatedWord => {
        this.gameWords.push(new GameWords(translatedWord.origin, translatedWord.target));
      });
    };
  }


  Check() {
    this.isCheckedButtonWasClicked = true;

    let correctGuess = 0;



    if (correctGuess == this.gameWords.length) {
      this.checkMessage = "Well done, You finished!!!";
    } else {
      this.checkMessage = `You have translated ${correctGuess} out of ${this.gameWords.length} words correctly, try again`;
    }
  }
}

