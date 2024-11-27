import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing.module';
import { AppComponent } from './app.component';
import { Landing } from './UIComponents/app.landing';
import {StatementOfIntent} from './Letters/app.stateintent';
import {Report} from './Report/app.report';
import { SafeHtmlPipe } from './safeHTMLPipe';
import {QuillModule} from 'ngx-quill';
//import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    StatementOfIntent,
    Landing,
    Report,
    SafeHtmlPipe
  ],
  imports: [
    BrowserModule, HttpClientModule,
    AppRoutingModule,CommonModule,
    FormsModule,QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
