import { HttpHeaders, HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { CommonModule  } from '@angular/common';
import { ApiService } from '../rest/api.service';
import { ChangeDetectorRef, Component, OnInit, Input,Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { QuillEditorComponent } from 'ngx-quill';

// Component to manage the report templates section


@Component({
  selector: 'app-template',
  templateUrl: './app.template.html'
})
export class Template implements OnInit {
    @Input() reportParts:any;
    @Input() activeReportNumber:number=0;
    reportGroupings:any[]=[];
    public reportList:any[]=[];
    
    public hideReportContent:boolean=true;
    public hideNewReportTitle:boolean=true;
    public newReportName:string='';
    public hideStatusChange:boolean=true;
    public editReportPart:boolean=false;
    public showReportPart:boolean=false;
    public activeReportPart:string='';
    public displayReportPart:string[]=[];
    public activeIndex:number=1000;
    public activeMergeField:string='';
    public mergeFields:any[]=[];
    public conditionalContent:any[]=[];
    public dynamicContent:any[]=[];
    public questionMerge:any[]=[];
    public reportFields:any[]=[];
    public sectionFields:string[]=[];
    public reportIndex:number=0;
    public fullRefresh:boolean=false;
    


    constructor(private http: HttpClient,private apiService: ApiService,private elementRef: ElementRef){
        
      }
        
      ngOnInit() {
        let currentHeader:string='';
        // get the report list
        this.apiService.getReports().subscribe(data => {
          this.reportList=data;
        })
        // get merge fields and conditional content from the API
        this.apiService.getDistinctMergeFields().subscribe(data => {
          this.mergeFields=data;
        });
        this.apiService.getConditionalContent(this.activeReportNumber).subscribe(data => {
          this.conditionalContent=data;
        });
        this.apiService.getDynamicContent(this.activeReportNumber).subscribe(data => {
          this.dynamicContent=data;
        });
        this.apiService.getQuestionMerge(this.activeReportNumber).subscribe(data => {
          this.questionMerge=data;
        });
        
        // group up the report parts by heading
        for(let i=0;i<this.reportParts.length;i++){ 
            if(i==0){
                currentHeader=this.reportParts[i].sectionHeader;
                this.reportGroupings.push({sectionHeader:currentHeader});
            }else{
                if(currentHeader!=this.reportParts[i].sectionHeader){
                    currentHeader=this.reportParts[i].sectionHeader;
                    this.reportGroupings.push({sectionHeader:currentHeader});     
                }
            }
        }

      }

      
      reportContentView(index:number){
        this.reportIndex=index;
        this.apiService.getMergeFields(this.reportIndex).subscribe(data => {
          this.reportFields=data;
          
        });
        this.hideReportContent=false;
      }

      reportCopy(){
        
        this.apiService.copyReport(this.reportIndex,this.newReportName).subscribe(data => {
          this.fullRefresh=true;
          this.newReportName='';
          this.apiService.getReports().subscribe(data => {
            this.fullRefresh=false;
            this.reportList=data;
          })
        });
        this.hideReportContent=true;
      }
      
      showReportCopy(index:number,reportName:string){
        this.newReportName=reportName;
        this.reportIndex=index;
        this.hideNewReportTitle=false;
      }

      applyReportCopy(){
        this.hideNewReportTitle=true;
        this.reportCopy();

      }
      cancelReportCopy(){
        this.hideNewReportTitle=true;
      }
      updateStatus( reportId:number){
        this.hideStatusChange=false;
        this.activeIndex=reportId;
        
      }
      applyStatusUpdate(){
        // apply the status change
        this.apiService.applyStatusUpdate(this.activeIndex).subscribe(data => {
          this.fullRefresh=true;
          this.hideStatusChange=true;
          this.apiService.getReports().subscribe(data => {
            
            this.reportList=data;
            this.apiService.getActiveReportContent().subscribe(data => {
              this.activeReportNumber=data[0].reportId;
              this.fullRefresh=false;
            })
          })
        })
      }
      cancelStatusUpdate(){
        
        this.hideStatusChange=true;
      }

    showHTMLContent(contentHeader:string){
      this.displayReportPart=[];
      for(let i=0;i<this.reportParts.length;i++){ 
            if(this.reportParts[i].sectionHeader==contentHeader){
            this.displayReportPart.push(this.reportParts[i].sectionContent);
            }
        }
      
    }

    viewMergeField(mergeField:string){
      this.activeMergeField=mergeField;
    }

    editHTMLContent(content:string, index:number){
      this.activeIndex=index;
      this.displayReportPart[index]=content;
      this.activeReportPart=content;
      this.editReportPart=true;
      this.showReportPart=false;
      // get the merge fields for this report part
      this.getSectionMergeFields();
    }

    getSectionMergeFields(){
      this.sectionFields=[];
      let processFields:string[]=[];

      if(this.displayReportPart[this.activeIndex].includes('[[')){
        processFields=this.displayReportPart[this.activeIndex].split('[[');
        for(let i=0;i<processFields.length;i++){
          if(processFields[i].includes(']]')){ 
            this.sectionFields.push('[[' + processFields[i].split(']]')[0] + ']]');
          }
        }
      }
      
    }

}