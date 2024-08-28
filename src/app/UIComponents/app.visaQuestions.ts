import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import countries from '../../countries.json';
import visaQuestions from '../../visaQuestions.json';
import monthPeriods from '../../monthPeriods.json';
import visas from '../../visas.json';

@Component({
  selector: 'app-visa-questions',
  templateUrl: './app.visaQuestions.html'
})
export class VisaQuestions implements OnInit{
  public Countries: any[] = [];
public questionSet: Questions[] = [];
public MonthPeriods: MonthGroups[] = [];
public SelectedAge: number = 20;
public subQuestion: boolean = false;
public countryToAdd: string = '';
public visitedCountries: string = '';
constructor(private http: HttpClient) {
  this.Countries = countries;
  this.questionSet = visaQuestions;
  this.MonthPeriods = monthPeriods;
  
}

addVisited() {
  console.log('running');
  if (this.visitedCountries == '') {
    this.visitedCountries += this.countryToAdd;
  } else {
    this.visitedCountries += ',' + this.countryToAdd;
  }
  console.log(this.visitedCountries + '***');
}
clickYes() {
  this.subQuestion = true;
}
clickNo() {
  this.subQuestion = false;
}

ngOnInit() {
  
}
}

interface Questions {
Question: string;
Type: string;
PopulateFrom: string;
ChildQuestion: any;
}

interface MonthGroups {
period: string;
}
