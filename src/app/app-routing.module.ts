import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from "./views/heroes/heroes.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { HeroDetailComponent } from "./views/hero-detail/hero-detail.component";
import { MessagesComponent } from './views/messages/messages.component';
import { ForgotComponent } from './views/forgot/forgot.component';

const routes: Routes = [
  {
    path: '', component: DashboardComponent, data: { animation: 'isLeft'}
  },
  {
    path: 'heroes', component: HeroesComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'detail', component: HeroDetailComponent
  },
  {
    path: 'forgot', component: ForgotComponent, data: { animation: 'isRight'}
  },
  {
    path: 'rank', component: MessagesComponent, data: { animation: 'isLeft'}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
