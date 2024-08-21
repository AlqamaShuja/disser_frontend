import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-subject-area',
  templateUrl: './admin-subject-area.component.html',
  styleUrls: ['./admin-subject-area.component.css']
})
export class AdminSubjectAreaComponent implements OnInit {
  subjectAreas: any = []; 

  selectedSubjectArea: any = {};
  isEditMode: boolean = false;
  subjectAreaModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private subjectAreaService: ServicesService) { }

  ngOnInit(): void {
    this.subjectAreaService.getAllSubjectAreas().subscribe(res => {
      this.subjectAreas = res;
    });
  }

  openSubjectAreaModal(template: TemplateRef<any>, area: any = null): void {
    if (area) {
      this.isEditMode = true;
      this.selectedSubjectArea = { ...area }; // Clone the subject area object
    } else {
      this.isEditMode = false;
      this.selectedSubjectArea = { title: '', price: '' };
    }
    this.subjectAreaModalRef = this.modalService.show(template);
  }

  saveSubjectArea(): void {
    if (this.isEditMode) {
      // Update an existing subject area
      this.subjectAreaService.updateSubjectArea(this.selectedSubjectArea).subscribe(
        () => {
          const index = this.subjectAreas.findIndex((s: any) => s.id === this.selectedSubjectArea.id);
          if (index !== -1) {
            this.subjectAreas[index] = { ...this.selectedSubjectArea };
          }
          alert('Subject Area updated successfully');
          this.subjectAreaModalRef?.hide();
        },
        error => {
          console.error('Error updating Subject Area:', error);
          alert("Error Updating Subject Area: " + error.message);
        }
      );
    } else {
      // Add a new subject area
      this.subjectAreaService.addSubjectArea(this.selectedSubjectArea).subscribe(
        response => {
          this.selectedSubjectArea.id = response.id; // Assuming the response includes the new subject area ID
          this.subjectAreas.push({ ...this.selectedSubjectArea });
          alert('Subject Area added successfully');
          this.subjectAreaModalRef?.hide();
        },
        error => {
          console.error('Error adding Subject Area:', error);
          alert("Error Adding Subject Area: " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, area: any): void {
    this.selectedSubjectArea = area;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    this.subjectAreaService.deleteSubjectArea(this.selectedSubjectArea.id).subscribe(
      () => {
        this.subjectAreas = this.subjectAreas.filter((s: any) => s.id !== this.selectedSubjectArea.id);
        alert('Subject Area deleted successfully');
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting Subject Area:', error);
        alert("Error Deleting Subject Area: " + error.message);
      }
    );
  }
}
