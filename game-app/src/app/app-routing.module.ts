import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './core/components/game/game.component';
import { HomeComponent } from './core/components/home/home.component';
import { NAVIGATION_PATH } from './core/const/navigation.const';

const routes: Routes = [  
  {
    path: NAVIGATION_PATH.HOME,
    component: HomeComponent
  },
  {
    path: NAVIGATION_PATH.GAME,
    component: GameComponent
  },
  {
    path: '',
    redirectTo: NAVIGATION_PATH.HOME,
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: NAVIGATION_PATH.HOME
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
