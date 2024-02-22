import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CategoryServiceService } from '../categoryService.service';
import { CategoryWord } from '../shared/categoryWord';


@Component({
  selector: 'app-game-mode',
  standalone: true,
  imports: [
    CommonModule, MatTableModule, MatIconModule, MatButtonModule, MatSortModule, RouterLink, FooterComponent, HeaderComponent, MatFormFieldModule, MatSelectModule,
  ],
  templateUrl: './gameMode.component.html',
  styleUrl: './gameMode.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GameModeComponent implements OnInit {
  CategoryWords: CategoryWord[] = [];


  constructor(private cs: CategoryServiceService, private router: Router) {
  }

  onPlayButton(CategorywordId:string) {
    if (CategorywordId == undefined) {
      alert("choose category");
    } else {
      this.router.navigate(['newGame/' + CategorywordId]);
    }
  }
  ngOnInit(): void {
    this.CategoryWords = this.cs.list();
  }
}