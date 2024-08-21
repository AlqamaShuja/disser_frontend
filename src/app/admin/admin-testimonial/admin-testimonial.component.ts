import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-admin-testimonial',
  templateUrl: './admin-testimonial.component.html',
  styleUrls: ['./admin-testimonial.component.css']
})
export class AdminTestimonialComponent implements OnInit {
  testimonials: any = []; 

  selectedTestimonial: any = {};
  isEditMode: boolean = false;
  testimonialModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private testimonialService: TestimonialService) { }

  ngOnInit(): void {
    this.testimonialService.getAllServices().subscribe(res => {
      console.log(res, "===res:getAllServices");
      this.testimonials = res.data;
    });
  }

  openTestimonialModal(template: TemplateRef<any>, testimonial: any = null): void {
    if (testimonial) {
      this.isEditMode = true;
      this.selectedTestimonial = { ...testimonial }; // Clone the testimonial object
      
      // Format the date to 'yyyy-MM-dd'
      if (this.selectedTestimonial.date) {
        this.selectedTestimonial.date = new Date(this.selectedTestimonial.date).toISOString().split('T')[0];
      }
    } else {
      this.isEditMode = false;
      this.selectedTestimonial = { name: '', description: '', rating: '', date: '', location: '' };
    }
    this.testimonialModalRef = this.modalService.show(template);
  }
  // openTestimonialModal(template: TemplateRef<any>, testimonial: any = null): void {
  //   if (testimonial) {
  //     this.isEditMode = true;
  //     this.selectedTestimonial = { ...testimonial }; // Clone the testimonial object
  //   } else {
  //     this.isEditMode = false;
  //     this.selectedTestimonial = { name: '', description: '', rating: '', date: '', location: '' };
  //   }
  //   this.testimonialModalRef = this.modalService.show(template);
  // }

  saveTestimonial(): void {
    if (this.isEditMode) {
      // Update an existing testimonial
      this.testimonialService.update(this.selectedTestimonial, this.selectedTestimonial.id).subscribe(
        () => {
          const index = this.testimonials.findIndex((t: any) => t.id === this.selectedTestimonial.id);
          if (index !== -1) {
            this.testimonials[index] = { ...this.selectedTestimonial };
          }
          alert('Testimonial updated successfully');
          this.testimonialModalRef?.hide();
        },
        error => {
          console.error('Error updating testimonial:', error);
          alert("Error Updating Testimonial: " + error.message);
        }
      );
    } else {
      // Add a new testimonial
      this.testimonialService.create(this.selectedTestimonial).subscribe(
        response => {
          this.selectedTestimonial.id = response.id; // Assuming the response includes the new testimonial ID
          this.testimonials.push({ ...this.selectedTestimonial });
          alert('Testimonial added successfully');
          this.testimonialModalRef?.hide();
        },
        error => {
          console.error('Error adding testimonial:', error);
          alert("Error Adding Testimonial: " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, testimonial: any): void {
    this.selectedTestimonial = testimonial;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    this.testimonialService.delete(this.selectedTestimonial.id).subscribe(
      () => {
        this.testimonials = this.testimonials.filter((t: any) => t.id !== this.selectedTestimonial.id);
        alert('Testimonial deleted successfully');
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting testimonial:', error);
        alert("Error Deleting Testimonial: " + error.message);
      }
    );
  }
}





























// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { TestimonialService } from 'src/app/services/testimonial.service';

// @Component({
//   selector: 'app-admin-testimonial',
//   templateUrl: './admin-testimonial.component.html',
//   styleUrls: ['./admin-testimonial.component.css']
// })
// export class AdminTestimonialComponent {
//   testimonials: any[] = [];
//   servicesForm: FormGroup;
//   addService: boolean = false;
//   selectedObj: any;

//   constructor(private formBuilder: FormBuilder, private testimonialService: TestimonialService) {
//     this.servicesForm = this.formBuilder.group({
//       name: ['', Validators.required],
//       description: ['', [Validators.required]],
//       rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]],
//       date: ['', Validators.required],
//       location: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.getServices();
//   }

//   getServices(): void {
//     this.testimonialService.getAllServices().subscribe((res: any) => {
//       this.testimonials = res.data;
//     });
//   }

//   showAddService(service?: any): void {
//     this.selectedObj = service;
//     this.generateForm();
//     this.addService = !this.addService;
//   }

//   submitForm(action: any): void {
//     if (this.servicesForm.invalid) {
//       return;
//     }

//     const payload = {
//       name: this.servicesForm.value.name,
//       description: this.servicesForm.value.description,
//       rating: this.servicesForm.value.rating,
//       date: this.servicesForm.value.date,
//       location: this.servicesForm.value.location
//     };

//     if (action === 'add') {
//       this.testimonialService.create(payload).subscribe((res: any) => {
//         if (res.data.insertId) {
//           this.addService = !this.addService;
//           this.selectedObj = null;
//         }
//       });
//     } else {
//       this.testimonialService.update(payload, this.selectedObj.id).subscribe((res: any) => {
//         if (res.data.affectedRows) {
//           this.addService = !this.addService;
//           this.selectedObj = null;
//         }
//       });
//     }
//   }

//   generateForm(): void {
//     this.servicesForm = this.formBuilder.group({
//       name: [this.selectedObj ? this.selectedObj.name : '', Validators.required],
//       description: [this.selectedObj ? this.selectedObj.description : '', [Validators.required]],
//       rating: [this.selectedObj ? this.selectedObj.rating : '', [Validators.required, Validators.min(1), Validators.max(5)]],
//       date: [this.selectedObj ? this.selectedObj.date : '', Validators.required],
//       location: [this.selectedObj ? this.selectedObj.location : '', Validators.required],
//     });
//   }

//   deleteService(id: number): void {
//     this.testimonialService.delete(id).subscribe(res => {
//       console.log(res);
//     });
//   }
// }
