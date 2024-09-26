import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-statement-intent',
  templateUrl: './app.stateintent.html'
})
export class StatementOfIntent implements OnInit {

  public uiStage:number=0;
  public proceedButtonText:string="Start Generating Letter";
  public FullName:string="";
  public Address1:string="";
  public Address2:string="";
  public PostCode:string="";
  public Email:string="";
  public PhoneNumber:string="";
  public AppReference:string="";
  public baseURL="https://localhost:44381/";
  public letterPart1:string="";

  constructor(private http: HttpClient){

  }
    ngOnInit() {
  
    }

    checkStage(){
      console.log(this.uiStage);
      if(this.uiStage==2){
        // get the first part of the letter content
        const letterPayload: any = { letterType:'StatementOfIntent' , section: '1',inText:'' };
      
        let returnVal: string = '';

      
        const options = {
          'responseType': 'text' as 'json'
        }
        this.http.post<any>(this.baseURL + 'chatAI/GenerateLetterPart', letterPayload, options).subscribe(data => {
          console.log(data);
          let processData=data;
          // replace the the fields
          processData=processData.replace('[[FullName]]',this.FullName);
          processData=processData.replace('[[Address1]]',this.Address1);
          processData=processData.replace('[[Address2]]',this.Address2);
          processData=processData.replace('[[PostCode]]',this.PostCode);
          processData=processData.replace('[[Email]]',this.Email);
          processData=processData.replace('[[PhoneNumber]]',this.PhoneNumber);
          
          this.letterPart1=processData;
          })
        
      }
      
    }

    moveStage(isUp:boolean){
      // progress the stage to the next step
      if(isUp){
        this.uiStage++;
      }else{
        // or go back to the previous stage
        this.uiStage--;
      }
      // run checkStage to see how we need to react
      this.checkStage();
    }
}
