import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';
import { BASEURL } from 'src/globals';

@Component({
  selector: 'app-sub-services',
  templateUrl: './sub-services.component.html',
  styleUrls: ['./sub-services.component.css']
})
export class SubServicesComponent implements OnInit {
  subServices: any = [];
  services: any = [];
  selectedSubService: any = {};
  isEditMode: boolean = false;
  subServiceModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    maxHeight: '15rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    uploadUrl: `${BASEURL}upload/fileuploadAdmin`,
    customClasses: [],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ]
  };

  constructor(private modalService: BsModalService, private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.loadSubServices();
    this.loadServices();
  }

  // Fetch all sub-services
  loadSubServices(): void {
    this.servicesService.getAllSubServices().subscribe(
      res => {
        this.subServices = res;
      },
      error => {
        console.error('Error loading sub-services:', error);
        alert('Failed to load sub-services.');
      }
    );
  }

  // Fetch all services to associate a sub-service with a service
  loadServices(): void {
    this.servicesService.getAllServices().subscribe(
      res => {
        this.services = res;
      },
      error => {
        console.error('Error loading services:', error);
        alert('Failed to load services.');
      }
    );
  }

  // Open the modal to add/edit a sub-service
  openSubServiceModal(template: TemplateRef<any>, subService: any = null): void {
    if (subService) {
      this.isEditMode = true;
      this.selectedSubService = { ...subService };
    } else {
      this.isEditMode = false;
      this.selectedSubService = { title: '', price: '', description: '', service_id: null };
    }
    this.subServiceModalRef = this.modalService.show(template);
  }

  // Save a new or existing sub-service
  saveSubService(): void {
    if (this.isEditMode) {
      this.servicesService.updateSubService(this.selectedSubService).subscribe(
        res => {
          alert('Sub-service updated successfully');
          this.subServiceModalRef?.hide();
          this.loadSubServices(); // Reload sub-services
        },
        error => {
          console.error('Error updating sub-service:', error);
          alert('Failed to update sub-service.');
        }
      );
    } else {
      this.servicesService.addSubService(this.selectedSubService).subscribe(
        response => {
          alert('Sub-service added successfully');
          this.selectedSubService.id = response.id;
          this.subServices.push({ ...this.selectedSubService });
          this.subServiceModalRef?.hide();
        },
        error => {
          console.error('Error adding sub-service:', error);
          alert('Failed to add sub-service.');
        }
      );
    }
  }

  // Open the modal to confirm deletion of a sub-service
  openDeleteModal(template: TemplateRef<any>, subService: any): void {
    this.selectedSubService = subService;
    this.deleteModalRef = this.modalService.show(template);
  }

  // Confirm deletion of a sub-service
  confirmDelete(): void {
    this.servicesService.deleteSubService(this.selectedSubService.id).subscribe(
      () => {
        this.subServices = this.subServices.filter((s: any) => s.id !== this.selectedSubService.id);
        this.deleteModalRef?.hide();
        alert('Sub-service deleted successfully');
      },
      error => {
        console.error('Error deleting sub-service:', error);
        alert('Failed to delete sub-service.');
      }
    );
  }
}
