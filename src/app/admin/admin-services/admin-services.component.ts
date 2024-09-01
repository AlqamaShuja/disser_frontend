import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-services-page',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {
  services: any = []; 

  selectedService: any = {};
  isEditMode: boolean = false;
  serviceModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.getAllServices().subscribe(res => {
      console.log(res, "===res.services");
      this.services = res;
    });
   }

  openServiceModal(template: TemplateRef<any>, service: any = null): void {
    if (service) {
      this.isEditMode = true;
      this.selectedService = { ...service }; // Clone the service object
    } else {
      this.isEditMode = false;
      this.selectedService = { title: '', price: '' };
    }
    this.serviceModalRef = this.modalService.show(template);
  }

  saveService(): void {
    if (this.isEditMode) {
      // Find the service and update it
      const index = this.services.findIndex((s: any) => s.id === this.selectedService.id);
      if (index !== -1) {
        this.services[index] = { ...this.selectedService };
        this.servicesService.updateService(this.selectedService).subscribe(
          (res) => {
            alert('Service updated successfully');
            this.serviceModalRef?.hide();
          },
          error => {
            console.error('Error updating service:', error);
            alert("Error Updating Service: " + error.message);
          }
        );
      }
    } else {
      // Add a new service
      this.servicesService.addService(this.selectedService).subscribe(
        response => {
          console.log('Service added successfully:', response);
          this.selectedService.id = response.id; // Assuming the response includes the new service ID
          this.services.push({ ...this.selectedService });
          this.serviceModalRef?.hide();
          alert('Service Added Successfully');
        },
        error => {
          console.error('Error adding service:', error);
          alert("Error Adding Service: " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, service: any): void {
    this.selectedService = service;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    // Implement the delete logic here
    this.servicesService.deleteService(this.selectedService.id).subscribe(
      () => {
        this.services = this.services.filter((s: any) => s.id !== this.selectedService.id);
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting service:', error);
        alert("Error Deleting Service: " + error.message);
      }
    );
  }
}
