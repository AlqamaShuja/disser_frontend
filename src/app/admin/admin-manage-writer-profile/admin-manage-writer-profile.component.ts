import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service'; // Replace with your actual service

@Component({
  selector: 'app-admin-writer-page',
  templateUrl: './admin-manage-writer-profile.component.html',
  styleUrls: ['./admin-manage-writer-profile.component.css']
})
export class AdminWriterPageComponent implements OnInit {
  writers: any = []; 

  selectedWriter: any = {};
  confirmPassword: string = ''; // Add confirmPassword field for comparison
  isEditMode: boolean = false;
  writerModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private serviceService: ServicesService) { }

  ngOnInit(): void {
    // Load the existing writers
    this.serviceService.getAllWriters().subscribe(res => {
      console.log(res, "===res.writers");
      this.writers = res;
    });
  }

  openWriterModal(template: TemplateRef<any>, writer: any = null): void {
    if (writer) {
      this.isEditMode = true;
      this.selectedWriter = { ...writer }; // Clone the writer object
      this.selectedWriter.password = ''; // Do not prefill the password for editing
    } else {
      this.isEditMode = false;
      this.selectedWriter = { email: '', name: '', role: 'Writer', status: 'Active', password: '' };
      this.confirmPassword = '';
    }
    this.writerModalRef = this.modalService.show(template);
  }

  saveWriter(): void {
    // Password validation: ensure that password and confirmPassword match
    if (!this.isEditMode && this.selectedWriter.password !== this.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log(this.selectedWriter, "====this.selectedWriter");
    if (this.isEditMode) {
      // Handle update writer logic
      this.serviceService.updateWriter(this.selectedWriter.id, this.selectedWriter).subscribe(
        response => {
          console.log('Writer updated successfully:', response);
          alert("Successfully Updated");
          this.writerModalRef?.hide();
        },
        error => {
          console.error('Error updating writer:', error);
          alert("Error Updating Writer: " + error.message);
        }
      );
    } else {
      // Handle create new writer logic
      this.serviceService.addWriter(this.selectedWriter).subscribe(
        response => {
          console.log('Writer added successfully:', response);
          alert("Successfully Added");
          this.writers.push({ ...this.selectedWriter });
          this.writerModalRef?.hide();
        },
        error => {
          console.error('Error adding writer:', error);
          alert("Error Adding Writer: " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, writer: any): void {
    this.selectedWriter = writer;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    console.log(this.selectedWriter.id, "===this.selectedWriter.id:delete");
    this.serviceService.deleteWriter(this.selectedWriter.id).subscribe(
      response => {
        console.log('Writer deleted successfully:', response);
        alert("Successfully Deleted");
        this.writers = this.writers.filter((w: any) => w.id !== this.selectedWriter.id);
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting writer:', error);
        alert("Error Deleting Writer: " + error.message);
      }
    );
  }
}
