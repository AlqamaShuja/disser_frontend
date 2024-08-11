import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-our-program',
  templateUrl: './our-program.component.html',
  styleUrls: ['./our-program.component.css']
})
export class OurProgramComponent implements OnInit, AfterViewInit {
  ngOnInit(): void {
    AOS.init();
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
