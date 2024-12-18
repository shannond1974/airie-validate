import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../rest/api.service';

@Component({
  selector: 'app-landing',
  templateUrl: './app.landing.html'
})
export class Landing implements OnInit {

    public submissions:any[]=[];
    public submissiondetails:any[]=[];
    public currentAnswerId=0;
    public reportAnswerId=0;
    public hideDashboard=false;
    public hideReportData=true;
    public hideReportTemplates=true;
    public hideQuestions=true;
    public loading=true;
    public userName='';
    public firstName='';
    public uniqueLink='';
    public email='';
    public reportParts:any;
    public activeReport:number=0;

    ngOnInit() {
      this.apiService.getActiveReportContent().subscribe(data => {
        this.reportParts=data;
        this.activeReport=data[0].reportId;
        this.loading=false;
      });
    }

    constructor(private http: HttpClient,private apiService: ApiService){
      this.loadSubmissions();
    }
    dashboardView(){
      this.hideDashboard=false;
      this.hideReportData=true;
      this.hideQuestions=true;
      this.hideReportTemplates=true;
    }

    reportTemplateView(){
      this.hideDashboard=true;
      this.hideReportData=true;
      this.hideQuestions=true;
      this.hideReportTemplates=false;
    }
    
    reportContentView(){
      this.hideDashboard=true;
      this.hideReportData=true;
      this.hideQuestions=true;
      this.hideReportTemplates=true;
      
    }
    questionView(){
      this.hideDashboard=true;
      this.hideReportData=true;
      this.hideQuestions=false;
      this.hideReportTemplates=true;
      
    }
    viewDetails(answerSetId:number){
      this.reportAnswerId=0;
      this.hideDashboard=true;
      this.hideQuestions=true;
      this.hideReportTemplates=true;
      this.hideReportData=false;
      this.currentAnswerId=answerSetId;
      
    }
    gotoReport(answerSetId:number, userName:string,firstName:string, uniqueLink:string, email:string){
      this.hideDashboard=true;
      this.hideQuestions=true;
      this.hideReportTemplates=true;
      this.hideReportData=false;
      this.userName=userName;
      this.firstName=firstName;
      this.reportAnswerId=answerSetId;
      this.uniqueLink=uniqueLink;
      this.email=email;
    }
    loadSubmissions(){
      this.apiService.getSubmittedAnswers().subscribe(data => {
        
        let AnswerSetId=0;
        for(var i = 0; i < data.length; i++){
          if(AnswerSetId!=data[i].answerSetId){
           
            AnswerSetId=data[i].answerSetId;
            this.submissions.push(data[i]);
            this.submissiondetails.push(data[i]);
          }else{
            this.submissiondetails.push(data[i]);
          }
          
        }
        console.log(this.submissiondetails);
      })
    }
  
}
