import { Component, OnInit } from '@angular/core';
import { SamplesService } from '../services/samples.service';
import { Router, ActivatedRoute } from '@angular/router'; // Import ActivatedRoute

@Component({
  selector: 'app-samplelist',
  templateUrl: './samplelist.component.html',
  styleUrls: ['./samplelist.component.css'],
})
export class SamplelistComponent implements OnInit {
  samples: any[] = [];
  filteredSamples: any[] = [];
  displayData: any[] = [];
  chunkedArray: any;
  selectedSample: any;
  sampleCheck: boolean = false;
  pageNo: number = 1;
  noOfPages: number = 1;
  currentPage: number = 1;
  searchKey: string = "";

  constructor(
    private router: Router,
    private sampleService: SamplesService,
    private route: ActivatedRoute // Inject ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log('Button clicked');
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

    // Subscribe to query parameters
    this.route.queryParams.subscribe(params => {
      const service = params['service'];
      
      this.sampleService.getSamples().subscribe((res) => {
        this.samples = res.data;

        if (service) {
          // Convert service to number and filter samples
          const serviceId = Number(service);
          this.filteredSamples = this.samples.filter(sample => sample.researchId === serviceId);
        } else {
          this.filteredSamples = this.samples; // Show all samples if no service filter is present
        }
      });
    });
  }

  selectSample(selectSample: any): void {
    this.sampleCheck = true;
    this.selectedSample = selectSample;
  }

  onSubmitOrder(event: any): void {}

  getDate(inputDateString: string): String {
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

  onSearch(event: KeyboardEvent) {
    console.log(event.key);
    if (event.key === 'Enter') {
      this.filteredSamples = this.samples.filter(element => element?.Title?.includes(this.searchKey));
    } else if (event.key === 'Backspace' && this.searchKey === '') {
      this.filteredSamples = this.samples;
    }
  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  // Handle the topic selection
  onTopicSelected(topic: any): void {
    if(topic.id === 0){
      this.filteredSamples = this.samples;
    }
    else {
      this.filteredSamples = this.samples.filter(sample => sample.researchId === topic.id);
    }
  }
}





























// import { Component, OnInit } from '@angular/core';
// import { SamplesService } from '../services/samples.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-samplelist',
//   templateUrl: './samplelist.component.html',
//   styleUrls: ['./samplelist.component.css'],
// })
// export class SamplelistComponent implements OnInit {
//   samples: any[] = [];
//   filteredSamples: any[] = [];
//   displayData: any[] = [];
//   chunkedArray: any;
//   selectedSample: any;
//   sampleCheck: boolean = false;
//   pageNo: number = 1;
//   noOfPages: number = 1;
//   currentPage: number = 1;
//   searchKey: string = "";

//   constructor(
//     private router: Router,
//     private sampleService: SamplesService
//   ) {}

//   ngOnInit(): void {
//     console.log('Button clicked');
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth'
//     });
//     this.sampleService.getSamples().subscribe((res) => {
//       console.log(res.data, "ascnajcnancjsnjcasnaaaaaaa");
      
//       this.samples = res.data;
//       this.filteredSamples = res.data;
//     });
//   }

//   selectSample(selectSample: any): void {
//     this.sampleCheck = true;
//     this.selectedSample = selectSample;
//   }

//   onSubmitOrder(event: any): void {}

//   getDate(inputDateString: string): String {
//     const inputDate = new Date(inputDateString);

//     const options: Intl.DateTimeFormatOptions = {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     };
//     const formattedDate = inputDate.toLocaleDateString('en-US', options);
//     return formattedDate;
//   }

//   getRange(n: number): number[] {
//     return Array.from({ length: n }, (_, index) => index);
//   }

//   onSearch(event: KeyboardEvent) {
//     console.log(event.key);
//     if (event.key === 'Enter') {
//       this.filteredSamples = this.samples.filter(element => element?.Title?.includes(this.searchKey));
//     } else if (event.key === 'Backspace' && this.searchKey === '') {
//       this.filteredSamples = this.samples;
//     }
//   }

//   chunkArray(array: any[], chunkSize: number): any[][] {
//     const chunks = [];
//     for (let i = 0; i < array.length; i += chunkSize) {
//       chunks.push(array.slice(i, i + chunkSize));
//     }
//     return chunks;
//   }

//   // Handle the topic selection
//   onTopicSelected(topic: any): void {
//     if(topic.id === 0){
//       this.filteredSamples = this.samples
//     }
//     else {
//       this.filteredSamples = this.samples.filter(sample => sample.researchId === topic.id);
//     }
//   }
// }
