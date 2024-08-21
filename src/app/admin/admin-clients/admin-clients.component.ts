import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-clients',
  templateUrl: './admin-clients.component.html',
  styleUrls: ['./admin-clients.component.css']
})
export class AdminClientsComponent implements OnInit {
  clients: any = []; 

  selectedClient: any = {};
  isEditMode: boolean = false;
  clientModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private clientService: AuthService) { }

  ngOnInit(): void {
    this.clientService.getAllUsers().subscribe(res => {
      // console.log(res, "==asnacjajcnanscaj:userList");
      this.clients = res.data;
    });
  }

  openClientModal(template: TemplateRef<any>, client: any = null): void {
    if (client) {
      this.isEditMode = true;
      this.selectedClient = { ...client }; // Clone the client object
    } else {
      this.isEditMode = false;
      this.selectedClient = { name: '', email: '', phone_number: '', uid: '' };
    }
    this.clientModalRef = this.modalService.show(template);
  }

  saveClient(): void {
    if (this.isEditMode) {
      // Update an existing client
      this.clientService.updateUser(this.selectedClient).subscribe(
        () => {
          const index = this.clients.findIndex((c: any) => c.id === this.selectedClient.id);
          if (index !== -1) {
            this.clients[index] = { ...this.selectedClient };
          }
          alert('Client updated successfully');
          this.clientModalRef?.hide();
        },
        error => {
          console.error('Error updating client:', error);
          alert("Error Updating Client: " + error.message);
        }
      );
    } else {
      // Add a new client
      this.clientService.createUser(this.selectedClient).subscribe(
        response => {
          this.selectedClient.id = response.id; // Assuming the response includes the new client ID
          this.clients.push({ ...this.selectedClient });
          alert('Client added successfully');
          this.clientModalRef?.hide();
        },
        error => {
          console.error('Error adding client:', error);
          alert("Error Adding Client: " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, client: any): void {
    this.selectedClient = client;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    this.clientService.delete(this.selectedClient.id).subscribe(
      () => {
        this.clients = this.clients.filter((c: any) => c.id !== this.selectedClient.id);
        alert('Client deleted successfully');
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting client:', error);
        alert("Error Deleting Client: " + error.message);
      }
    );
  }
}
































// import { Component } from '@angular/core';
// import { FormGroup, FormBuilder } from '@angular/forms';
// import { AuthService } from 'src/app/services/auth.service';

// @Component({
//   selector: 'app-admin-clients',
//   templateUrl: './admin-clients.component.html',
//   styleUrls: ['./admin-clients.component.css'],
// })
// export class AdminClientsComponent {
//   users: any[] = [];
//   selectedService: any;
//   addService: boolean = false;
//   servicesForm!: FormGroup;
//   deleteClient:any;
//   deleteCode:any='';
//   constructor(
//     private formBuilder: FormBuilder,
//     private authService: AuthService
//   ) {}

//   ngOnInit(): void {
//     this.getServices();
//   }
//   getServices(): void {
//     this.authService.getAllUsers().subscribe((res: any) => {
//       this.users = res.data;
//     });
//   }

//   showAddService(service?: any): void {
//     this.selectedService = service;
//     this.generateForm();
//     this.addService = !this.addService;
//   }
//   generateForm() {
//     this.servicesForm = this.formBuilder.group({
//       name: [this.selectedService.name],
//       email: [this.selectedService.email],
//       phone_number: [this.selectedService.phone_number],
//     });
//   }
//   submitForm(event: any): void {
//     this.authService.updateUser(this.servicesForm.value).subscribe((res) => {
//       if (res) {
//         this.addService = !this.addService;
//       }
//     });
//   }
//   checkDelete(i:any,event:any){
//     this.deleteClient = i;
//     this.selectedService = event;
//   }
//   deleteUser():void{
//     if(this.deleteCode === 'Office123'){
//       this.authService.delete(this.selectedService.id).subscribe((res:any)=>{
//         this.deleteClient = null;
//         this.deleteCode = '';
//         window.location.reload();
//       })
//     }
//   }
// }
