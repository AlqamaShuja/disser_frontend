import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css'],
})
export class AdminClientsComponent {
  users: any[] = [];
  selectedService: any;
  addService: boolean = false;
  servicesForm!: FormGroup;
  deleteClient:any;
  deleteCode:any='';
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getServices();
  }
  getServices(): void {
    this.authService.getAllUsers().subscribe((res: any) => {
      this.users = res.data;
    });
  }

  showAddService(service?: any): void {
    this.selectedService = service;
    this.generateForm();
    this.addService = !this.addService;
  }
  generateForm() {
    this.servicesForm = this.formBuilder.group({
      name: [this.selectedService.name],
      email: [this.selectedService.email],
      phone_number: [this.selectedService.phone_number],
    });
  }
  submitForm(event: any): void {
    this.authService.updateUser(this.servicesForm.value).subscribe((res) => {
      if (res) {
        this.addService = !this.addService;
      }
    });
  }
  checkDelete(i:any,event:any){
    this.deleteClient = i;
    this.selectedService = event;
  }
  deleteUser():void{
    if(this.deleteCode === 'Office123'){
      this.authService.delete(this.selectedService.id).subscribe((res:any)=>{
        this.deleteClient = null;
        this.deleteCode = '';
        window.location.reload();
      })
    }
  }
}
