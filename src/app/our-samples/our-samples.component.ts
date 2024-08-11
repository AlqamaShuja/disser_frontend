import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-our-samples',
  templateUrl: './our-samples.component.html',
  styleUrls: ['./our-samples.component.css']
})
export class OurSamplesComponent {

  constructor(private router: Router) {}

  navigateToLevel(level: string, type: string): void {
    this.router.navigate([`/our-samples/${level}/${type}`]);
  }
}
