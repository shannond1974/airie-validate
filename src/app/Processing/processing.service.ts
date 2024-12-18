import { Injectable } from '@angular/core';

// process string - based logic (merging etc)
@Injectable({
  providedIn: 'root'
})
export class ProcessingService {

  constructor() { }

  checkMergeFieldForConditionalLogic(conditionalLogic:any,mergeField:string){

    for(let i=0;i<conditionalLogic.length;i++){
      if(conditionalLogic[i].mergeField==mergeField){
        console.log(conditionalLogic[i]);
        return conditionalLogic[i];
      }
    }
    return null;
  }

  checkMergeFieldForQuestions(mergeQuestions:any,mergeField:string){
    
    for(let i=0;i<mergeQuestions.length;i++){
      if(mergeQuestions[i].mergeField==mergeField && mergeQuestions[i].questionSetName!=null){
        return mergeQuestions[i];
      }
    }
    return null;
  }
  
  checkMergeFieldForDyanmicContent(dynamicContent:any,mergeField:string){

    for(let i=0;i<dynamicContent.length;i++){
      if(dynamicContent[i].mergeField==mergeField){
        return dynamicContent[i];
      }
    }
    return null;
  }
  
  
}
