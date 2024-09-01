import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-desired-grade-page',
  templateUrl: './admin-desire-grade.component.html',
  styleUrls: ['./admin-desire-grade.component.css'],
})
export class AdminDesiredGradeComponent implements OnInit {
  grades: any = [];

  selectedGrade: any = {};
  isEditMode: boolean = false;
  gradeModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private desiredGradeService: ServicesService) { }

  ngOnInit(): void {
    this.desiredGradeService.getAllGrades().subscribe(res => {
      this.grades = res;
    });
  }

  openGradeModal(template: TemplateRef<any>, grade: any = null): void {
    if (grade) {
      this.isEditMode = true;
      this.selectedGrade = { ...grade }; // Clone the grade object
    } else {
      this.isEditMode = false;
      this.selectedGrade = { title: '', description: '', price: '' };
    }
    this.gradeModalRef = this.modalService.show(template);
  }

  saveGrade(): void {
    if (this.isEditMode) {
      // Find the grade and update it
      const index = this.grades.findIndex((g: any) => g.id === this.selectedGrade.id);
      if (index !== -1) {
        this.grades[index] = { ...this.selectedGrade };
        this.desiredGradeService.updateGrade(this.selectedGrade).subscribe(
          () => {
            alert('Grade updated successfully');
            this.gradeModalRef?.hide();
          },
          error => {
            console.error('Error updating grade:', error);
            alert("Error Updating Grade: " + error.message);
          }
        );
      }
    } else {
      // Add a new grade
      this.desiredGradeService.addGrade(this.selectedGrade).subscribe(
        response => {
          this.selectedGrade.id = response.id; // Assuming the response includes the new grade ID
          this.grades.push({ ...this.selectedGrade });
          this.gradeModalRef?.hide();
          alert('Grade added successfully');
        },
        error => {
          console.error('Error adding grade:', error);
          alert("Error Adding Grade: " + error.message);
        }
      );
    }
  }

  openDeleteModal(template: TemplateRef<any>, grade: any): void {
    this.selectedGrade = grade;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    this.desiredGradeService.deleteGrade(this.selectedGrade.id).subscribe(
      () => {
        this.grades = this.grades.filter((g: any) => g.id !== this.selectedGrade.id);
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting grade:', error);
        alert("Error Deleting Grade: " + error.message);
      }
    );
  }
}
