import { Component } from '@angular/core';
import { TestimonialService } from '../services/testimonial.service';
import { NgZone } from '@angular/core';
@Component({
  selector: 'app-view-all-testimonials',
  templateUrl: './view-all-testimonials.component.html',
  styleUrls: ['./view-all-testimonials.component.css']
})
export class ViewAllTestimonialsComponent {
  testimonials: any[] = [];

  constructor(
    private testimonialService: TestimonialService,
    private zone: NgZone 
    ) {}

  ngOnInit() {
    this.testimonialService.getAllServices().subscribe((res: any) => {
      this.testimonials = res.data;
      console.log(res.data,'THE RESPONSE DATA')
      this.testimonials.forEach(testimonial => {
        testimonial.expanded = false;
      });
    });
  }
  generateStars(starRating: number): string {
    console.log(starRating,"THE STAAR")
    
    const fullStars = '★'.repeat(Math.floor(starRating));
    const halfStar = (starRating % 1 !== 0) ? '☆' : ''; // Add half star if needed
    const emptyStars = '☆'.repeat(Math.floor(5 - starRating));

    return `${fullStars}${halfStar}${emptyStars}`;
  }

  // toggleDescription(index: number) {
  //   // Toggle the expanded state for the selected testimonial
  //   this.testimonials[index].expanded = !this.testimonials[index].expanded;
  // }
  toggleDescription(testimonial: any): void {
    // Use NgZone.run to make sure Angular knows about the changes
    this.zone.run(() => {
      testimonial.showFullDescription = !testimonial.showFullDescription;
    });
  }
}
