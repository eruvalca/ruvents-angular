import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RuventCreateComponent } from './components/ruvent-create/ruvent-create.component';
import { RuventDetailComponent } from './components/ruvent-detail/ruvent-detail.component';
import { RuventEditComponent } from './components/ruvent-edit/ruvent-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new', component: RuventCreateComponent },
  { path: 'detail/:id', component: RuventDetailComponent },
  { path: 'edit/:id', component: RuventEditComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
