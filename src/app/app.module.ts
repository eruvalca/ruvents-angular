import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RuventCreateComponent } from './components/ruvent-create/ruvent-create.component';
import { HomeComponent } from './components/home/home.component';
import { RuventDetailComponent } from './components/ruvent-detail/ruvent-detail.component';
import { RuventEditComponent } from './components/ruvent-edit/ruvent-edit.component';
import { NumberToTimePipe } from './pipes/numberToTime';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';

export function tokenGetter() {
  return localStorage.getItem('Token');
}

@NgModule({
  declarations: [
    AppComponent,
    RuventCreateComponent,
    HomeComponent,
    RuventDetailComponent,
    NumberToTimePipe,
    RuventEditComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [
          'ruvents-api20191022110832.azurewebsites.net',
          'localhost:44356'
        ],
        blacklistedRoutes: [
          'ruvents-api20191022110832.azurewebsites.net/api/auth/register',
          'ruvents-api20191022110832.azurewebsites.net/api/auth/login',
          'localhost:44356/api/auth/register',
          'localhost:44356/api/auth/login'
        ]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
