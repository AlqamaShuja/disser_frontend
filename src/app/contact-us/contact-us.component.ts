import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TestimonialService } from '../services/testimonial.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent {
  country:any;
  contactUs:FormGroup;
  constructor(private formBuilder:FormBuilder,private testimonial:TestimonialService,private router:Router){
    this.contactUs = this.formBuilder.group({
      name:['',Validators.required],
      email:['',Validators.required],
      subject:['',Validators.required],
      phoneNumber:['',Validators.required],
      message:['',Validators.required],
    })
  }

  submit():void{
    if(this.contactUs.invalid){
      return;
    }else{
      this.contactUs.value.phoneNumber = this.country+' '+this.contactUs.value.phoneNumber;
      this.testimonial.createContact(this.contactUs.value).subscribe((res)=>{
        alert('Thank you for contacting us, we will get back to you shortly through email or our Business WhatsApp.');
        this.router.navigate(['/']);
      })
    }
  }


}
