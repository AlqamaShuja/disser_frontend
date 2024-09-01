
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from '../services/testimonial.service';
import { Router } from '@angular/router';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  country: any = '';  // Initialize with a default value or bind it to a select input if needed
  contactUs: FormGroup;
  @Input() showBanner: string = 'no';

  constructor(
    private formBuilder: FormBuilder,
    private testimonial: TestimonialService,
    private router: Router,
    private serviceService: ServicesService,
  ) {
    this.contactUs = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]], // Added email validation
      subject: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      message: ['', Validators.required],
    });
  }
  
  ngOnInit(): void {
    console.log(this.showBanner, "====showBannershowBanner");
  }

  submit(): void {
    if (this.contactUs.invalid) {
      alert('Please fill all required fields.');
      return;
    } else {
      // this.contactUs.value.phone = this.country + ' ' + this.contactUs.value.phoneNumber;
      console.log(this.contactUs.value, "====this.contactUs.value");
      const data = {
        ...this.contactUs.value,
        phone_number: this.contactUs.value.phoneNumber
      }
      this.serviceService.createInquiries(data).subscribe({
        next: (res) => {
          console.log(res, "===res:loginnnnn");
          alert('Thank you for contacting us, we will get back to you shortly through email or our Business WhatsApp.');
          this.router.navigate(['/']);
        },
        error: (err) => {
          alert('There was an error processing your request. Please try again later.');
          console.error('Error submitting contact form:', err);
        }
      });
      // this.testimonial.createContact().subscribe({
      //   next: (res) => {
      //     alert('Thank you for contacting us, we will get back to you shortly through email or our Business WhatsApp.');
      //     this.router.navigate(['/']);
      //   },
      //   error: (err) => {
      //     alert('There was an error processing your request. Please try again later.');
      //     console.error('Error submitting contact form:', err);
      //   }
      // });
    }
  }
}



























// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { TestimonialService } from '../services/testimonial.service';
// import { Router } from '@angular/router';

// @Component({
//   selector: 'app-contact-us',
//   templateUrl: './contact-us.component.html',
//   styleUrls: ['./contact-us.component.css']
// })
// export class ContactUsComponent {
//   country:any;
//   contactUs:FormGroup;
//   constructor(private formBuilder:FormBuilder,private testimonial:TestimonialService,private router:Router){
//     this.contactUs = this.formBuilder.group({
//       name:['',Validators.required],
//       email:['',Validators.required],
//       subject:['',Validators.required],
//       phoneNumber:['',Validators.required],
//       message:['',Validators.required],
//     })
//   }

//   submit():void{
//     if(this.contactUs.invalid){
//       return;
//     }else{
//       this.contactUs.value.phoneNumber = this.country+' '+this.contactUs.value.phoneNumber;
//       this.testimonial.createContact(this.contactUs.value).subscribe((res)=>{
//         alert('Thank you for contacting us, we will get back to you shortly through email or our Business WhatsApp.');
//         this.router.navigate(['/']);
//       })
//     }
//   }


// }
