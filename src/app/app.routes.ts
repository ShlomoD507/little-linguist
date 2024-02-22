import { Routes } from '@angular/router';
import { TableComponent } from './table/table.component';
import { addCategoryComponent } from './add-category/add-category.component';
import { GameModeComponent } from './gameMode/gameMode.component';
import { TranslationGameComponent } from './translationGame/translationGame.component';



export const routes: Routes = [
{ path: '', component: TableComponent },
{ path: 'add-category/:id', component: addCategoryComponent },
{path:'newcategory',component:addCategoryComponent},
{path:'gameMode',component:GameModeComponent},
{path:'managementMode',component:TableComponent},
{ path: 'newGame/:id', component:TranslationGameComponent },
];
