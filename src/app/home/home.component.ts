import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  ngOnInit(): void {
    Aos.init();
  }
  
}
