import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit{
  services: any[] = [];
  servicesForm!:FormGroup;
  addService:boolean = false;
  selectedService:any;


  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    uploadUrl: 'https://proassignmentbackend.smartedultd.co.uk/api/v1/upload/fileuploadAdmin',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      { class: 'verdana', name: 'Verdana' },
      { class: 'courier-new', name: 'Courier New' },
      { class: 'arial-black', name: 'Arial Black' },
      { class: 'book-antiqua', name: 'Book Antiqua' },
      { class: 'tahoma', name: 'Tahoma' },
      { class: 'trebuchet-ms', name: 'Trebuchet MS' },
      { class: 'garamond', name: 'Garamond' },
      { class: 'cambria', name: 'Cambria' },
      { class: 'helvetica', name: 'Helvetica' },
      { class: 'arial-narrow', name: 'Arial Narrow' },
      { class: 'rockwell', name: 'Rockwell' },
      { class: 'century-gothic', name: 'Century Gothic' },
      { class: 'franklin-gothic-medium', name: 'Franklin Gothic Medium' },
      { class: 'arial-rounded', name: 'Arial Rounded' },
    ],    
  };
  constructor(private formBuilder: FormBuilder,private serviceService:ServicesService){
    
  }

  ngOnInit():void{
    this.getServices();
  }
  getServices():void{
    this.serviceService.getAllServices().subscribe((res:any)=>{
      this.services  =res.data;
    })
  }

  showAddService(service?:any):void{
    this.selectedService = service;
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
      icon:this.selectedService?this.selectedService.icon:'',
      tagLine:this.selectedService?this.selectedService.tagLine:'',
      images:this.selectedService?this.selectedService.image:'',
      menuIconImage:this.selectedService?this.selectedService.menuIconImage:'',
      postiontodisplay:this.selectedService?this.selectedService.postiontodisplay:'',
      PrimaryPage:this.selectedService?this.selectedService.PrimaryPage:'',
      shortDescription:this.selectedService?this.selectedService.shortDescription:'',
      pageDescription:this.servicesForm.value?.description,
      pageTitle:this.servicesForm.value?.pageTitle,
      metaKeyWord:this.servicesForm.value?.keywords,
      metaDescription:this.servicesForm.value?.metaDescription,
      additionalHeaders:this.selectedService?this.selectedService.additionalHeaders:''
    }
    if(action === 'add'){
    this.serviceService.create(payload).subscribe((res:any)=>{
      if(res.data.insertId){
        this.addService = !this.addService;
        this.selectedService = null;
        this.getServices();

      }
    })}else{
      this.serviceService.update(payload,this.selectedService.pagesID).subscribe((res:any)=>{
        if(res.data.affectedRows){
          this.addService = !this.addService;
          this.selectedService = null;
          this.getServices();

        }
      })
    }
  }
  generateForm():void{
    this.servicesForm = this.formBuilder.group({
      pageTitle: [this.selectedService ? this.selectedService.pageTilte:'', Validators.required],
      pageSlug: [this.selectedService ? this.selectedService.pageSlug:'', [Validators.required]],
      keywords: [this.selectedService ? this.selectedService.metaKeyWord:'', Validators.required],
      metaDescription: [this.selectedService ? this.selectedService.metaDescription:'', Validators.required],
      description: [this.selectedService ? this.selectedService.pageDescription:'', Validators.required]
    });
  }
  deleteService(id:number):void{
    this.serviceService.delete(id).subscribe(res => {
      window.location.reload();
    })
  }
}
