import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialService } from '../services/testimonial.service';
import { BASEURL } from 'src/globals';

@Component({
  selector: 'app-home-testimonial-section',
  templateUrl: './home-testimonial-section.component.html',
  styleUrls: ['./home-testimonial-section.component.css']
})
export class HomeTestimonialSectionComponent implements OnInit {
  testimonials: any[] = [];
  responsiveOptions: any[];

  constructor(
    private testimonialService: TestimonialService,
    private router: Router // Inject the Router
  ) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '768px',
        numVisible: 1,
        numScroll: 1
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
  }

  ngOnInit(): void {
    this.testimonialService.getAllServices().subscribe((res: any) => {
      this.testimonials = res.data.slice(0, 5);
      console.log(res.data, 'THE RESPONSE DATA HERE');
    });
  }

  // Method to navigate to all testimonials
  viewAllTestimonials(): void {
    this.router.navigate(['/all-testimonials']);
  }

  getImageUrl(imageKey: string): string | ArrayBuffer | null {
    return `${BASEURL}files/${imageKey}`;
  }
}
