import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-admin-testimonial',
  templateUrl: './admin-testimonial.component.html',
  styleUrls: ['./admin-testimonial.component.css']
})
export class AdminTestimonialComponent {
  testimonials: any[] = [];
  servicesForm: FormGroup;
  addService: boolean = false;
  selectedObj: any;

  constructor(private formBuilder: FormBuilder, private testimonialService: TestimonialService) {
    this.servicesForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
      date: ['', Validators.required],
      location: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getServices();
  }

  getServices(): void {
    this.testimonialService.getAllServices().subscribe((res: any) => {
      this.testimonials = res.data;
    });
  }

  showAddService(service?: any): void {
    this.selectedObj = service;
    this.generateForm();
    this.addService = !this.addService;
  }

  submitForm(action: any): void {
    if (this.servicesForm.invalid) {
      return;
    }

    const payload = {
      name: this.servicesForm.value.name,
      description: this.servicesForm.value.description,
      rating: this.servicesForm.value.rating,
      date: this.servicesForm.value.date,
      location: this.servicesForm.value.location
    };

    if (action === 'add') {
      this.testimonialService.create(payload).subscribe((res: any) => {
        if (res.data.insertId) {
          this.addService = !this.addService;
          this.selectedObj = null;
        }
      });
    } else {
      this.testimonialService.update(payload, this.selectedObj.id).subscribe((res: any) => {
        if (res.data.affectedRows) {
          this.addService = !this.addService;
          this.selectedObj = null;
        }
      });
    }
  }

  generateForm(): void {
    this.servicesForm = this.formBuilder.group({
      name: [this.selectedObj ? this.selectedObj.name : '', Validators.required],
      description: [this.selectedObj ? this.selectedObj.description : '', [Validators.required]],
      rating: [this.selectedObj ? this.selectedObj.rating : '', [Validators.required, Validators.min(1), Validators.max(5)]],
      date: [this.selectedObj ? this.selectedObj.date : '', Validators.required],
      location: [this.selectedObj ? this.selectedObj.location : '', Validators.required],
    });
  }

  deleteService(id: number): void {
    this.testimonialService.delete(id).subscribe(res => {
      console.log(res);
    });
  }
}
