import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Landing } from './app.landing';
import { Visas } from './app.visas';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'airie';
  public iCount:number=0;
  // use this variable to determine where we are in the workflow.
  public uiStage:number=1;

  ngOnInit() {
  
  }

  moveStage(isUp:boolean){
    // progress the stage to the next step
    if(isUp){
      this.uiStage++;
    }else{
      // or go back to the previous stage
      this.uiStage--;
    }

  }
}
