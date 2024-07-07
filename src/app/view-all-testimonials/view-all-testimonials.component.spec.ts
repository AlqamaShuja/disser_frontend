import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TestimonialService } from '../services/testimonial.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-view-all-testimonials',
  templateUrl: './view-all-testimonials.component.html',
  styleUrls: ['./view-all-testimonials.component.css']
})
export class ViewAllTestimonialsComponent {
  testimonials: any[] = [];
  selectedTestimonial: any;
  bsModalRef!: BsModalRef;

  @ViewChild('template') modalTemplate!: TemplateRef<any>;

  constructor(
    private testimonialService: TestimonialService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.testimonialService.getAllServices().subscribe((res: any) => {
      this.testimonials = res.data;
      this.testimonials.forEach(testimonial => {
        testimonial.expanded = false;
      });
    });
  }

  generateStars(starRating: number): string {
    const fullStars = '★'.repeat(Math.floor(starRating));
    const halfStar = (starRating % 1 !== 0) ? '☆' : '';
    const emptyStars = '☆'.repeat(Math.floor(5 - starRating));

    return `${fullStars}${halfStar}${emptyStars}`;
  }

  // Function to open the modal with the complete description
  openModal(testimonial: any): void {
    this.selectedTestimonial = testimonial;
    this.bsModalRef = this.modalService.show(this.modalTemplate);
  }

  toggleDescription(index: number) {
    this.testimonials[index].expanded = !this.testimonials[index].expanded;
  }
}
