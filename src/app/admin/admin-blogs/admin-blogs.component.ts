import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit{
  blogs: any[] = [];
  servicesForm!:FormGroup;
  addService:boolean = false;
  selectedBlogs:any;
  constructor(private formBuilder: FormBuilder,private serviceService:ServicesService){
  }

  ngOnInit():void{
    this.getServices();
  }
  getServices():void{
    this.serviceService.getAllBlogs().subscribe((res:any)=>{
      this.blogs  =res.data;
    })
  }

  showAddService(service?:any):void{
    this.selectedBlogs = service;
    this.generateForm();
    this.addService = !this.addService;
  }

  submitForm(action:any):void{
    if(this.servicesForm.invalid){
      return;
    }
    const payload = {
      pageTilte:this.servicesForm.value?.pageTitle,
      pageSlug:this.servicesForm.value?.pageSlug,
      icon:this.selectedBlogs?this.selectedBlogs.icon:'',
      tagLine:this.selectedBlogs?this.selectedBlogs.tagLine:'',
      images:this.selectedBlogs?this.selectedBlogs.image:'',
      menuIconImage:this.selectedBlogs?this.selectedBlogs.menuIconImage:'',
      postiontodisplay:this.selectedBlogs?this.selectedBlogs.postiontodisplay:'',
      PrimaryPage:this.selectedBlogs?this.selectedBlogs.PrimaryPage:'',
      shortDescription:this.selectedBlogs?this.selectedBlogs.shortDescription:'',
      pageDescription:this.servicesForm.value?.description,
      pageTitle:this.servicesForm.value?.pageTitle,
      metaKeyWord:this.servicesForm.value?.keywords,
      metaDescription:this.servicesForm.value?.metaDescription,
      additionalHeaders:this.selectedBlogs?this.selectedBlogs.additionalHeaders:''
    }
    if(action === 'add'){
    this.serviceService.createBlog(payload).subscribe((res:any)=>{
      if(res.data.insertId){
        this.addService = !this.addService;
        this.selectedBlogs = null;
      }
    })}else{
      this.serviceService.updateBlog(payload,this.selectedBlogs.pagesID).subscribe((res:any)=>{
        if(res.data.affectedRows){
          this.addService = !this.addService;
          this.selectedBlogs = null;
        }
      })
    }
  }
  generateForm():void{
    this.servicesForm = this.formBuilder.group({
      pageTitle: [this.selectedBlogs ? this.selectedBlogs.pageTilte:'', Validators.required],
      pageSlug: [this.selectedBlogs ? this.selectedBlogs.pageSlug:'', [Validators.required]],
      keywords: [this.selectedBlogs ? this.selectedBlogs.metaKeyWord:'', Validators.required],
      metaDescription: [this.selectedBlogs ? this.selectedBlogs.metaDescription:'', Validators.required],
      description: [this.selectedBlogs ? this.selectedBlogs.pageDescription:'', Validators.required]
    });
  }
  deleteService(id:number):void{
    this.serviceService.deleteBlog(id).subscribe(res => {
      console.log(res)
    })
  }
}
