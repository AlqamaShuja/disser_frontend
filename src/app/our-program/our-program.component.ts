import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import * as AOS from 'aos';

@Component({
  selector: 'app-our-program',
  templateUrl: './our-program.component.html',
  styleUrls: ['./our-program.component.css']
})
export class OurProgramComponent implements OnInit, AfterViewInit {
  @Input() beingAGoodResidential!: SafeHtml;

  ngOnInit(): void {
    AOS.init();
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
