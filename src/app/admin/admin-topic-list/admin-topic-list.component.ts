import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BASEURL } from 'src/globals';

@Component({
  selector: 'admin-topic-list',
  templateUrl: './admin-topic-list.component.html',
  styleUrls: ['./admin-topic-list.component.css']
})
export class AdminTopicListComponent implements OnInit {
  topics: any[] = [];
  topicForm: FormGroup;
  isEditing = false;
  selectedTopic: any = null;
  isModalOpen = false;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    uploadUrl: `${BASEURL}/upload/fileuploadAdmin`,  // Ensure you define BASEURL
    customClasses: [],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private topicService: ServicesService
  ) {
    this.topicForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required],
      research_aim: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadTopics();
  }

  getTruncatedDescription(description: string): string {
    return description.length > 60 ? description.slice(0, 60) + '...' : description;
  }

  loadTopics(): void {
    this.topicService.getAllTopic().subscribe((topics) => {
      this.topics = topics;
    });
  }

  openModal(topic: any = null): void {
    this.isEditing = !!topic;
    this.selectedTopic = topic;

    if (this.isEditing) {
      this.topicForm.patchValue(topic);
    } else {
      this.topicForm.reset();
    }

    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  saveTopic(): void {
    if (this.topicForm.invalid) {
      alert("Please fill all fields")
      return;
    }

    const topicData = this.topicForm.value;

    console.log(topicData, "====topicDataaaaaa");
    

    if (this.isEditing) {
      this.topicService.updateTopic(this.selectedTopic.id, topicData).subscribe(() => {
        this.loadTopics();
        this.closeModal();
      });
    } else {
      this.topicService.createTopic(topicData).subscribe(() => {
        this.loadTopics();
        this.closeModal();
      });
    }
  }

  deleteTopic(id: number): void {
    if (confirm('Are you sure you want to delete this topic?')) {
      this.topicService.deleteTopic(id).subscribe(() => {
        this.loadTopics();
      });
    }
  }
}
