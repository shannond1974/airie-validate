import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { Landing } from './UIComponents/app.landing';
import { Visas } from './UIComponents/app.visas';
import {Navbar} from './UIComponents/app.navbar';
import { VisaQuestions } from './UIComponents/app.visaQuestions';
import {Header} from './UIComponents/app.header';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    Landing,
    Visas,
    VisaQuestions,
    Navbar,
    Header
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,CommonModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
