import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrls: ['./testimonials.component.css'],
})
export class TestimonialsComponent {
  @Input()
  aboutUs:boolean = false;
  testimonials: any[] = [];
  isAbout:boolean = false;
  responsiveOptions: any[] | undefined;
  activeIndex: number = 0; // Initialize activeIndex to 0

  onIndicatorClick(index: number) {
    console.log("index : "+index)  
    this.activeIndex = index; // Update activeIndex when a dot is clicked
  }
  constructor(
    private testimonialService: TestimonialService,
    private router: Router
  ) {
    if (this.router.url.includes('about')) {
      this.isAbout = true;
    }
  }

  ngOnInit() {
    this.testimonialService.getAllServices().subscribe((res: any) => {
      this.testimonials = res.data;
      console.log(res.data,'THE RESPONSE DATA HERE')
    });
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  generateStars(starRating: number): string {
    
    const fullStars = '★'.repeat(Math.floor(starRating));
    const halfStar = (starRating % 1 !== 0) ? '☆' : ''; // Add half star if needed
    const emptyStars = '☆'.repeat(Math.floor(5 - starRating));

    return `${fullStars}${halfStar}${emptyStars}`;
  }
}
