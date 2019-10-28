import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RuventCreateComponent } from './components/ruvent-create/ruvent-create.component';
import { RuventDetailComponent } from './components/ruvent-detail/ruvent-detail.component';
import { RuventEditComponent } from './components/ruvent-edit/ruvent-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'new', component: RuventCreateComponent },
  { path: 'detail/:id', component: RuventDetailComponent },
  { path: 'edit/:id', component: RuventEditComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
