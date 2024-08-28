import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import visas from '../../visas.json';

@Component({
  selector: 'app-visas',
  templateUrl: './app.visas.html'
})
export class Visas implements OnInit {
    public selectVisa:any=visas;
    ngOnInit() {
        console.log(this.selectVisa);
    }
}
