import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-refrence-style',
  templateUrl: './admin-refrence-style.component.html',
  styleUrls: ['./admin-refrence-style.component.css'],
})
export class AdminRefrenceStyleComponent implements OnInit {
  styles: any = [];

  selectedStyle: any = {};
  isEditMode: boolean = false;
  styleModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private referencingStyleService: ServicesService) { }

  ngOnInit(): void {
    this.referencingStyleService.getAllStyles().subscribe(res => {
      this.styles = res;
    });
  }

  openStyleModal(template: TemplateRef<any>, style: any = null): void {
    if (style) {
      this.isEditMode = true;
      this.selectedStyle = { ...style }; // Clone the style object
    } else {
      this.isEditMode = false;
      this.selectedStyle = { title: '', description: '', price: '' };
    }
    this.styleModalRef = this.modalService.show(template);
  }

  saveStyle(): void {
    if (this.isEditMode) {
      // Find the style and update it
      const index = this.styles.findIndex((s: any) => s.id === this.selectedStyle.id);
      if (index !== -1) {
        this.styles[index] = { ...this.selectedStyle };
        this.referencingStyleService.updateStyle(this.selectedStyle).subscribe(
          () => {
            alert('Style updated successfully');
            this.styleModalRef?.hide();
          },
          error => {
            console.error('Error updating style:', error);
            alert("Error Updating Style: " + error.message);
          }
        );
      }
    } else {
      // Add a new style
      this.referencingStyleService.addStyle(this.selectedStyle).subscribe(
        response => {
          this.selectedStyle.id = response.id; // Assuming the response includes the new style ID
          this.styles.push({ ...this.selectedStyle });
          this.styleModalRef?.hide();
          alert('Style added successfully');
        },
        error => {
          console.error('Error adding style:', error);
          alert("Error Adding Style: " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, style: any): void {
    this.selectedStyle = style;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    this.referencingStyleService.deleteStyle(this.selectedStyle.id).subscribe(
      () => {
        this.styles = this.styles.filter((s: any) => s.id !== this.selectedStyle.id);
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting style:', error);
        alert("Error Deleting Style: " + error.message);
      }
    );
  }
}
