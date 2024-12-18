import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule  } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Input,Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';
import { ProcessingService } from '../Processing/processing.service';   

// Component to manage the report templates section


@Component({
  selector: 'app-mergefields',
  templateUrl: './app.mergefields.html'
})
export class MergeFields implements OnInit {
    @Input() mergeFields:any;
    @Input() conditionalContent:any;
    @Input() dynamicContent:any;
    @Input() questionMerge:any;
    @Input() activeMergeField:string='';

    public conditionalLogicMatch:any;
    public dynamicContentMatch:any;
    public questionMergeMatch:any;  

    constructor(private http: HttpClient,private processingService: ProcessingService,private elementRef: ElementRef){
        
    }
      
    ngOnInit() {
        console.log(this.conditionalContent);
        console.log(this.questionMerge);
        console.log(this.activeMergeField);
        // first see if the active merge field has conditional logic (level 3)
        this.conditionalLogicMatch=null;
        this.conditionalLogicMatch=this.processingService.checkMergeFieldForConditionalLogic(this.conditionalContent,this.activeMergeField);
        if(this.conditionalLogicMatch!=null){
            console.log('conditional logic match');
        }

        // then check to see if it is dynmaic content (level 2)
        this.dynamicContentMatch=null;
        this.dynamicContentMatch=this.processingService.checkMergeFieldForDyanmicContent(this.dynamicContent,this.activeMergeField);
        if(this.dynamicContentMatch!=null){
            console.log('dynamic content match');
        }
        // finally must be a straight mapping to a question - need to see what that is (level 1)
        this.questionMergeMatch=null;
        this.questionMergeMatch=this.processingService.checkMergeFieldForQuestions(this.questionMerge,this.activeMergeField);
        if(this.questionMergeMatch!=null){
            console.log('question merge match');
        }
    }

}