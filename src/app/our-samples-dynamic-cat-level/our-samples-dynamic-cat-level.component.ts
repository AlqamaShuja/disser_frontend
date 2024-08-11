import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-our-samples-dynamic-cat-level',
  templateUrl: './our-samples-dynamic-cat-level.component.html',
  styleUrls: ['./our-samples-dynamic-cat-level.component.css']
})
export class OurSamplesDynamicCatLevelComponent {
  level: string = '';
  type: string = '';
  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    console.log("run abcded");
    
    this.route.params.subscribe(params => {
      this.level = params['level'];
      this.type = params['type'];
      // this.topic = this.capitalizeFirstLetter(params['topic']);

    });
  }

  viewSample(cat: string,): void {
    // const arr = cat.split("-");
    // const topic = arr[0];
    const slug = `our-samples/${this.level}/${this.type}/${cat}`
    this.router.navigate([`/${slug}`]);
  }
}
