import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TestimonialService } from 'src/app/services/testimonial.service';

@Component({
  selector: 'app-admin-contact',
  templateUrl: './admin-contact.component.html',
  styleUrls: ['./admin-contact.component.css']
})
export class AdminContactComponent {
  contacts: any[] = [];
  servicesForm:FormGroup;
  addService:boolean = false;
  selectedObj:any;
  constructor(private formBuilder: FormBuilder,private testimonialService:TestimonialService){
    this.servicesForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', [Validators.required]]
    });
  }

  ngOnInit():void{
    this.getServices();
  }
  getServices():void{
    this.testimonialService.getAllContact().subscribe((res:any)=>{
      this.contacts  =res.data;
    })
  }

  showAddService(service?:any):void{
    this.selectedObj = service;
    this.generateForm();
    this.addService = !this.addService;
  }

  submitForm(action:any):void{
    if(this.servicesForm.invalid){
      return;
    }
    const payload = {
      name:this.servicesForm.value.name,
      description:this.servicesForm.value.description
    }
    if(action === 'add'){
    this.testimonialService.create(payload).subscribe((res:any)=>{
      if(res.data.insertId){
        this.addService = !this.addService;
        this.selectedObj = null;
      }
    })}else{
      this.testimonialService.update(payload,this.selectedObj.id).subscribe((res:any)=>{
        if(res.data.affectedRows){
          this.addService = !this.addService;
          this.selectedObj = null;
        }
      })
    }
  }
  generateForm():void{
    this.servicesForm = this.formBuilder.group({
      name: [this.selectedObj?this.selectedObj.name:'', Validators.required],
      description: [this.selectedObj?this.selectedObj.description:'', [Validators.required]]
    });
  }
  deleteContcat(id:number):void{
    this.testimonialService.deleteContact(id).subscribe(res => {
      console.log(res)
    })
  }
}
