import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-conversation',
  templateUrl: './admin-conversation.component.html',
  styleUrls: ['./admin-conversation.component.css']
})
export class AdminConversationComponent {
  messageFor: string = '';
  description: string = '';
  amount: number = 0;
  files: File[] = [];
  messageOptions = [
    { value: 'writer', label: 'Writer' },
    { value: 'user', label: 'User' },
    // Add more options as needed
  ];

  constructor() {}

  sendMessage(): void {
    const formData = new FormData();
    formData.append('messageFor', this.messageFor);
    formData.append('description', this.description);
    formData.append('amount', this.amount.toString());
    this.files.forEach((file, index) => {
      formData.append(`file${index + 1}`, file);
    });

    // Handle form submission logic, e.g., send to a server
    console.log('Form Data:', formData);

    // Clear the form
    this.messageFor = '';
    this.description = '';
    this.amount = 0;
    this.files = [];
  }

  onFileSelected(event: any, index: number): void {
    const file: File = event.target.files[0];
    this.files[index - 1] = file;
  }
}
