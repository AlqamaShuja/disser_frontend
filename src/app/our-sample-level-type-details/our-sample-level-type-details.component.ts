import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplesService } from '../services/samples.service';
import { Location } from '@angular/common'; 

@Component({
  selector: 'app-our-sample-level-type-details',
  templateUrl: './our-sample-level-type-details.component.html',
  styleUrls: ['./our-sample-level-type-details.component.css']
})
export class OurSampleLevelTypeDetailsComponent implements OnInit {
  level: string = "";
  type: string = "";
  topic: string = "";
  catPoint: string = "";
  sampleData: any;
  isNotFound: boolean = false;

  constructor(
    private route: ActivatedRoute, 
    private samplesService: SamplesService, 
    private router: Router, 
    private location: Location) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.level = this.capitalizeFirstLetter(params['level']);
      this.type = this.capitalizeFirstLetter(params['type']);
      const arr = params['cat_point'].split("-");
      this.topic = decodeURIComponent(this.capitalizeFirstLetter(arr[0]));
      this.catPoint = arr[1];

      console.log({ level: this.level, type: this.type, topic: this.topic, catPoint: this.catPoint, }, "===asnmaascjancancnajsjasnsa");
      

      // Fetch sample data from backend based on route parameters
      this.fetchSampleData();
    });
  }

  capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  fetchSampleData(): void {
    this.samplesService.getSampleByLevelTypeTopicAndCatPoint(this.level.toLowerCase(), this.type.toLowerCase(), this.topic.toLowerCase(), this.catPoint)
      .subscribe({
        next: (data) => {
          if (data && Object.keys(data).length > 0) {
            this.sampleData = data;
            this.isNotFound = false;
          } else {
            this.isNotFound = true;
          }
          console.log(this.sampleData, 'Fetched Sample Data');
        },
        error: (error) => {
          console.error('Error fetching sample data', error);
          this.isNotFound = true;
        },
        complete: () => {
          console.log('Data fetching complete');
        }
      });
  }

  navigateToOrder(){
    this.router.navigate(["/order"])
  }

  goBack(): void {
    this.location.back(); // Use the back() method of Location service
  }
}
