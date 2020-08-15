import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesComponent } from "./views/heroes/heroes.component";
import { DashboardComponent } from "./views/dashboard/dashboard.component";
import { HeroDetailComponent } from "./views/hero-detail/hero-detail.component";

const routes: Routes = [
  {
    path: '', component: DashboardComponent
  },
  {
    path: 'heroes', component: HeroesComponent
  },
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'detail', component: HeroDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true, scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
