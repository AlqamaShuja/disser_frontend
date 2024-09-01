import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-academic-level',
  templateUrl: './academic-level.component.html',
  styleUrls: ['./academic-level.component.css']
})
export class AcademicLevelComponent implements OnInit {
  levels: any = []; 

  selectedLevel: any = {};
  isEditMode: boolean = false;
  levelModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private academicLevelService: ServicesService) { }

  ngOnInit(): void {
    this.academicLevelService.getAllAcademicLevels().subscribe(res => {
      this.levels = res;
    });
  }

  openLevelModal(template: TemplateRef<any>, level: any = null): void {
    if (level) {
      this.isEditMode = true;
      this.selectedLevel = { ...level }; // Clone the level object
    } else {
      this.isEditMode = false;
      this.selectedLevel = { title: '', price: '' };
    }
    this.levelModalRef = this.modalService.show(template);
  }

  saveLevel(): void {
    if (this.isEditMode) {
      // Find the level and update it
      const index = this.levels.findIndex((s: any) => s.id === this.selectedLevel.id);
      if (index !== -1) {
        this.levels[index] = { ...this.selectedLevel };
        this.academicLevelService.updateAcademicLevel(this.selectedLevel).subscribe(
          () => {
            alert('Academic level updated successfully');
            this.levelModalRef?.hide();
          },
          error => {
            console.error('Error updating academic level:', error);
            alert("Error Updating Academic Level: " + error.message);
          }
        );
      }
    } else {
      // Add a new academic level
      this.academicLevelService.addAcademicLevel(this.selectedLevel).subscribe(
        response => {
          this.selectedLevel.id = response.id; // Assuming the response includes the new academic level ID
          this.levels.push({ ...this.selectedLevel });
          this.levelModalRef?.hide();
          alert('Academic level added successfully');
        },
        error => {
          console.error('Error adding academic level:', error);
          alert("Error Adding Academic Level: " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, level: any): void {
    this.selectedLevel = level;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    // Implement the delete logic here
    this.academicLevelService.deleteAcademicLevel(this.selectedLevel.id).subscribe(
      () => {
        this.levels = this.levels.filter((s: any) => s.id !== this.selectedLevel.id);
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting academic level:', error);
        alert("Error Deleting Academic Level: " + error.message);
      }
    );
  }
}









// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-academic-level',
//   templateUrl: './academic-level.component.html',
//   styleUrls: ['./academic-level.component.css']
// })
// export class AcademicLevelComponent {

// }
