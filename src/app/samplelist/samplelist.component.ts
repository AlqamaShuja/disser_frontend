import { Component, OnInit, Renderer2 } from '@angular/core';
import { SamplesService } from '../services/samples.service';
import { OrderService } from '../services/order.service';
import { GlobalService } from '../services/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-samplelist',
  templateUrl: './samplelist.component.html',
  styleUrls: ['./samplelist.component.css'],
})
export class SamplelistComponent implements OnInit {
  samples: any[] = [];
  displayData:any[] = [];
  chunkedArray:any;
  selectedSample: any;
  sampleCheck: boolean = false;
  pageNo:number = 1;
  noOfPages:number = 1;
  currentPage:number = 1;
  searchKey:string = "";
  constructor(
    private router: Router,
    private sampleService: SamplesService,

  ) {}
  ngOnInit(): void {
    console.log('Button clicked');
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Use 'smooth' for smooth scrolling, or 'auto' for instant scrolling
    });
    this.sampleService.getSamples().subscribe((res) => {
      this.samples = res.data;
      this.chunkedArray = this.chunkArray(res.data,50);
      this.displayData = this.chunkedArray[0];
      this.noOfPages = Math.trunc(res.data.length / 50) + 1;
      console.log(this.noOfPages)
    });
  }
  selectSample(selectSample: any): void {
    this.sampleCheck = true;
    this.selectedSample = selectSample;
  }
  onSubmitOrder(event: any): void {
    
  }

  getDate(inputDateString:string): String {
    const inputDate = new Date(inputDateString);

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    };
    const formattedDate = inputDate.toLocaleDateString('en-US', options);
    return formattedDate;
  }
  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }

  onSearch(event: KeyboardEvent){
    console.log(event.key)
    if (event.key === 'Enter') {
      this.displayData = this.samples.filter(element => element?.Title?.includes(this.searchKey));
    }else if(event.key === 'Backspace' && this.searchKey === ''){
      this.displayData = this.samples;
    }
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }
}
