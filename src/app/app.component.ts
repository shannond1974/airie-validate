import { Component } from '@angular/core';
import { RouterOutlet,ActivatedRoute  } from '@angular/router';
import { Landing } from './UIComponents/app.landing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'airie';
  public proceedButtonText:string="Pick a Visa Type!";
  public iCount:number=0;
  // use this variable to determine where we are in the workflow.
  public uiStage:number=0;
  public userName:string='';
  public passWord:string='';
  public invalidPassword:boolean=false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.userName=='airie';
    const queryParams = this.route.snapshot.queryParams;
    console.log(queryParams);
  }

  moveStageCustom(moveTo:number){
    // progress the stage to the next step
    this.uiStage=moveTo;
    
  }
  login(){
    if(this.passWord=='Airie2024!Migrate' && this.userName=='airie'){
      this.invalidPassword=false;
      this.uiStage=10;
    }else{
      this.invalidPassword=true;
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
    if(this.uiStage<2){
      this.proceedButtonText="Pick a Visa Type!";
    }else{
      this.proceedButtonText="Get My Report!";
    }
  }
}
