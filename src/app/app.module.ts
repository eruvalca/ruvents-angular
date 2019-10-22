import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RuventCreateComponent } from './components/ruvent-create/ruvent-create.component';
import { HomeComponent } from './components/home/home.component';
import { RuventDetailComponent } from './components/ruvent-detail/ruvent-detail.component';
import { NumberToTimePipe, NumberToTimeCodePipe } from './pipes/numberToTime';
import { RuventEditComponent } from './components/ruvent-edit/ruvent-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    RuventCreateComponent,
    HomeComponent,
    RuventDetailComponent,
    NumberToTimePipe,
    RuventEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    NumberToTimePipe,
    NumberToTimeCodePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
