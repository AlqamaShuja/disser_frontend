import { Component, OnInit } from '@angular/core';
import { SamplesService } from 'src/app/services/samples.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-dissertation-sample-academic-level',
  templateUrl: './dissertation-sample-academic-level.component.html',
  styleUrls: ['./dissertation-sample-academic-level.component.css']
})
export class DissertationSampleAcademicLevelComponent implements OnInit {
  displayData: any[] = [];
  currentPage: number = 1;
  noOfPages: number = 1;
  isDeleteModalVisible: boolean = false;
  isEditModalVisible: boolean = false;
  selectedSample: any = null;
  editForm!: FormGroup;
  topics: any[] = [];
  catPoints: string[] = ['2:1', '2:2'];
  types: string[] = ['dissertations'];
  levels: string[] = ['undergraduate', 'masters', 'phd', 'm-phill', 'post-graduate'];
  isEditMode: boolean = false; // New variable to track if we're editing or adding

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '150px',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no'
  };

  constructor(
    private sampleService: SamplesService, 
    private serviceServices: ServicesService, 
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadSamples();
    this.getServices();
    this.initForm();
  }

  loadSamples(): void {
    this.sampleService.getAllSampleByLevel().subscribe(data => {
      this.displayData = data;
      this.noOfPages = Math.ceil(this.displayData.length / 10); // Example: 10 items per page
    });
  }

  getServices(): void {
    this.serviceServices.getAllTopic().subscribe((res: any) => {
      this.topics = res;
    });
  }

  initForm(): void {
    this.editForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      cat_point: ['', Validators.required],
      type: ['', Validators.required],
      level: ['', Validators.required],
      topic: ['', Validators.required]
    });
  }

  truncateDescription(description: string): string {
    return description.length > 20 ? description.substring(0, 20) + '...' : description;
  }

  onClickAddSamples(): void {
    this.isEditMode = false; // Set to false to indicate we're adding a new sample
    this.editForm.reset(); // Clear the form
    this.isEditModalVisible = true; // Show the modal
  }

  onClickEditSample(sample: any): void {
    this.isEditMode = true; // Set to true to indicate we're editing an existing sample
    this.selectedSample = sample;
    this.editForm.patchValue(sample); // Populate form with existing data
    this.isEditModalVisible = true;
  }

  openDeleteModal(sample: any): void {
    this.selectedSample = sample;
    this.isDeleteModalVisible = true;
  }

  hideDeleteModal(): void {
    this.isDeleteModalVisible = false;
    this.selectedSample = null;
  }

  hideEditModal(): void {
    this.isEditModalVisible = false;
    this.selectedSample = null;
  }

  confirmDelete(): void {
    if (this.selectedSample) {
      this.sampleService.deleteSampleLevelById(this.selectedSample.id).subscribe(() => {
        this.displayData = this.displayData.filter(s => s.id !== this.selectedSample.id);
        this.hideDeleteModal();
        alert("Successfully Deleted");
      });
    }
  }

  saveChanges(): void {
    if (this.editForm.valid) {
      const updatedSample = { ...this.selectedSample, ...this.editForm.value };

      if (this.isEditMode) {
        // Editing an existing sample
        this.sampleService.updateSampleLevelById(updatedSample.id, updatedSample).subscribe(() => {
          const index = this.displayData.findIndex(s => s.id === updatedSample.id);
          if (index !== -1) {
            this.displayData[index] = updatedSample;
          }
          this.hideEditModal();
          alert("Successfully Updated");
        });
      } else {
        // Adding a new sample
        this.sampleService.addSampleLevel(updatedSample).subscribe((newSample) => {
          this.displayData.push(updatedSample); // Add new sample to the list
          this.hideEditModal();
          alert("Successfully Added");
        });
      }
    }
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.noOfPages) {
      this.currentPage = page;
      // Logic to fetch data for the specific page, if not all data is loaded initially
    }
  }

  getRange(total: number): number[] {
    return Array(total).fill(0).map((_, i) => i + 1);
  }
}
