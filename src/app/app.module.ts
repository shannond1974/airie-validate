import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { Landing } from './app.landing';
import { Visas } from './app.visas';
import { VisaQuestions } from './app.visaQuestions';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    Landing,
    Visas,
    VisaQuestions
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,CommonModule,
    NgbModule,FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
