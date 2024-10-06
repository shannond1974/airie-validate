import { HttpHeaders, HttpClient } from '@angular/common/http';
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
    public userName='';
    public firstName='';
    public uniqueLink='';
    public email='';
    ngOnInit() {
  
    }

    constructor(private http: HttpClient,private apiService: ApiService){
      this.loadSubmissions();
    }
    viewDetails(answerSetId:number){
      
      this.currentAnswerId=answerSetId;
    }
    gotoReport(answerSetId:number, userName:string,firstName:string, uniqueLink:string, email:string){
      
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
