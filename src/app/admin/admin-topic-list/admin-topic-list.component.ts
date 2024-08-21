import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';

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

  constructor(
    private formBuilder: FormBuilder,
    private topicService: ServicesService
  ) {
    this.topicForm = this.formBuilder.group({
      title: ['', Validators.required],
      price: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadTopics();
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
      return;
    }

    const topicData = this.topicForm.value;

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
