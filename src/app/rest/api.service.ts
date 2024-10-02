import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  public baseURL="https://localhost:44381/";
  //public baseURL="https://airiesample555.azurewebsites.net/";
  

  constructor(private httpClient: HttpClient) { }

  public getReportContent(reportId:number){
    const options = {
      'responseType': 'text'
    }
    let reportRequest0: any = { ReportId:String(reportId) ,options };

    return this.httpClient.post<any>(this.baseURL + 'Airie/GetReportContent', reportRequest0);;

  }
  
  public getConditionalLogic(reportId:number){
    const options = {
      'responseType': 'text'
    }
    let reportRequest0: any = { ReportId:String(reportId) ,options };

    return this.httpClient.post<any>(this.baseURL + 'Airie/GetConditionalContent', reportRequest0);;

  }

  public getReportAnswers(answerId:number){
    const options = {
      'responseType': 'text'
    }
    let answerRequest: any = { AnswerSetId:String(answerId) ,options };

    return this.httpClient.post<any>(this.baseURL + 'Airie/GetQuestionAnswers', answerRequest);;

  }

  public getInformationContent(reportId:number){
    const options = {
      'responseType': 'text'
    }
    let reportRequest: any = { ReportId:String(reportId) ,options };

    return this.httpClient.post<any>(this.baseURL + 'Airie/GetInformationContent', reportRequest);;

  }

  public sendEmail(email:Email){
    const options = {
      'responseType': 'text'
    }
    let emailRequest: any = { email:email.email, internal:email.internalEmail,AnswerSetId:email.AnswerSetId,options };
    return this.httpClient.post<any>(this.baseURL + 'Airie/EmailReport', emailRequest);
  }

}
interface Email{
  email:string;
  internalEmail:boolean;
  AnswerSetId:number;
}
