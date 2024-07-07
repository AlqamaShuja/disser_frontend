import { Component } from '@angular/core';
import { SamplesService } from 'src/app/services/samples.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-samples',
  templateUrl: './samples.component.html',
  styleUrls: ['./samples.component.css']
})
export class SamplesComponent {
  samples:any[] = [];
  selectedSample:any;
  sampleCheck:boolean = false;
  responsiveOptions: any[] | undefined;

  constructor(
    private router: Router,
    private sampleService:SamplesService){}
  ngOnInit(): void {
    this.sampleService.getSamples().subscribe((res)=>{
      for(let i = 0;i < ((res.data.length > 6 ? 6:res.data.length));i++){
        this.samples.push(res.data[res.data.length-i-1]);
      }
    });
    this.responsiveOptions = [
      {
          breakpoint: '1199px',
          numVisible: 1,
          numScroll: 1
      },
      {
          breakpoint: '991px',
          numVisible: 2,
          numScroll: 1
      },
      {
          breakpoint: '767px',
          numVisible: 1,
          numScroll: 1
      }
  ];
  }
}



