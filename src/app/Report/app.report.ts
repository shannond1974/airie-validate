import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-report',
  templateUrl: './app.report.html'
})
export class Report implements OnInit {

  public uiStage:number=0;
  public proceedButtonText:string="Apply Fields";
  //public baseURL="https://localhost:44381/";
  public baseURL="https://airiesample555.azurewebsites.net/";
  public reportParts0: string='';
  public reportParts1: string='';
  public reportParts2: string='';
  public reportParts3: string='';
  public reportParts4: string='';
  public answers:AnswerList[]=[];
  public userName:string='';
  public emailSent:string='';
  public emailToSend:string='anniekieun@gmail.com';
  public emailToSend2:string='garrik.perry@gmail.com';
public merged:boolean=false;

  constructor(private http: HttpClient){
    this.answers=[];
    
  }
    ngOnInit() {
      
        const options = {
            'responseType': 'text'
          }
        
          let reportRequest0: any = { ReportId:'2' , SectionContentId:'1',options };
          // get the report sections
          this.http.post<any>(this.baseURL + 'chatAI/GetReportContent', reportRequest0).subscribe(data => {
              console.log(data);
              this.reportParts0=data.value;
              
              
          })    

          let reportRequest1: any = { ReportId:'2' , SectionContentId:'2',options };
        // get the report sections
        this.http.post<any>(this.baseURL + 'chatAI/GetReportContent', reportRequest1).subscribe(data => {
            console.log(data);
            this.reportParts1=data.value;
            
            
        })    
        let reportRequest2: any = { ReportId:'2' , SectionContentId:'5',options };
        this.http.post<any>(this.baseURL + 'chatAI/GetReportContent', reportRequest2).subscribe(data => {
            console.log(data);
            this.reportParts2=data.value;
            
        })    
        let reportRequest3: any = { ReportId:'2' , SectionContentId:'7',options };
        this.http.post<any>(this.baseURL + 'chatAI/GetReportContent', reportRequest3).subscribe(data => {
            console.log(data);
            this.reportParts3=data.value;
            
        })    
        let reportRequest4: any = { ReportId:'2' , SectionContentId:'9',options };
        this.http.post<any>(this.baseURL + 'chatAI/GetReportContent', reportRequest4).subscribe(data => {
            console.log(data);
            this.reportParts4=data.value;
            
        })    
        let answersRequest: any = { AnswerSetId:'1',options };
        this.http.post<any>(this.baseURL + 'chatAI/GetQuestionAnswers', answersRequest).subscribe(data => {
          
          this.answers=data;
         
          if(this.answers.length>0){
            this.userName=this.answers[0].userName;
          }
          
      }) 

    }

    emailLink(){
      const options = {
        'responseType': 'text'
      }
    
      let emailRequest: any = { email:this.emailToSend, internal:false,AnswerSetId:'1',options };
      this.http.post<any>(this.baseURL + 'chatAI/EmailReport', emailRequest).subscribe(data => {
         console.log(data);
         this.emailSent='Email sent ok';
        
    }) 
    }

    emailLink2(){
      const options = {
        'responseType': 'text'
      }
    
      let emailRequest: any = { email:this.emailToSend2, internal:false,AnswerSetId:'1',options };
      this.http.post<any>(this.baseURL + 'chatAI/EmailReport', emailRequest).subscribe(data => {
         console.log(data);
         this.emailSent='Email sent ok';
        
    }) 
    }
    moveStage(isUp:boolean){
      this.reportParts0=this.reportParts0.replace('[[CustomerName]]','Daniel\'s');
      this.reportParts1=this.reportParts1.replace('[[PreparedFor]]',this.userName);
      this.reportParts1=this.reportParts1.replace('[[DatePrepared]]',String(new Date()));
      this.reportParts1=this.reportParts1.replace('[[Citizenship]]','Irish');
      this.reportParts2=this.reportParts2.replace('[[PreparedFor]]',this.userName);
      this.reportParts2=this.reportParts2.replace('[[DatePrepared]]',String(new Date()));
      this.reportParts4=this.reportParts4.replace('[[VisaType]]','Fee Paying Student Visa');
      if(this.answers.length>0){
        for(let i=0;i<this.answers.length;i++){
          this.reportParts4=this.reportParts4.replace(this.answers[i].mergeField,this.answers[i].answerText);
        }
      }
      this.merged=true;
    }


}

interface AnswerList {
  answerText: string;
  mergeField: string;
  userName: string;
  
  }
  
  interface Email{
    email:string;
    internalEmail:boolean;
    AnswerSetId:number;
  }


