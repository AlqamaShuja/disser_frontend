import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SamplesService } from 'src/app/services/samples.service';

@Component({
  selector: 'app-our-samples-dynamic-cat-level',
  templateUrl: './our-samples-dynamic-cat-level.component.html',
  styleUrls: ['./our-samples-dynamic-cat-level.component.css']
})
export class OurSamplesDynamicCatLevelComponent implements OnInit {
  level: string = '';
  type: string = '';
  samples: any[] = []; // Array to hold dynamic samples data
  groupedSamples: any[] = []; // Array to hold grouped samples data

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private samplesService: SamplesService // Inject SamplesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.level = params['level'];
      this.type = params['type'];
      this.loadSamples(); // Fetch samples whenever level or type changes
    });
  }

  // Function to load samples based on level and type
  loadSamples(): void {
    this.samplesService.getSampleByLevelType(this.level, this.type).subscribe(res => {
      this.samples = res;
      this.groupSamplesByTopic(); // Group samples after fetching
    });
  }

  // Function to group samples by topic
  groupSamplesByTopic(): void {
    const grouped = this.samples.reduce((acc, sample) => {
      // Create a unique key based on level, type, and topic
      const key = `${sample.level}-${sample.type}-${sample.topic}`;

      if (!acc[key]) {
        // If the group doesn't exist, create it
        acc[key] = {
          topic: sample.topic,
          level: sample.level,
          type: sample.type,
          catPoints: [], // Initialize an array for cat_points
        };
      }

      // Push the current sample's cat_point into the array
      acc[key].catPoints.push(sample.cat_point);

      return acc;
    }, {});

    console.log(grouped, "===groupedgrouped");

    // Convert the grouped object into an array
    this.groupedSamples = Object.values(grouped);
  }

  viewSample(cat: string): void {
    console.log({ level: this.level, type: this.type, cat }, "====asmaaakkkakakkakaa");
    
    const slug = `our-samples/${this.level}/${this.type}/${cat}`;
    this.router.navigate([`/${slug}`]);
  }
}