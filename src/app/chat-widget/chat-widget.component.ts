import { Component } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-chat-widget',
  templateUrl: './chat-widget.component.html',
  styleUrls: ['./chat-widget.component.css']
})
export class ChatWidgetComponent {
  isOpen = false;
  user = {
    name: '',
    email: ''
  };
  message = '';

  constructor(private serviceService: ServicesService){}

  toggleChat() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    if (this.user.name && this.user.email && this.message) {
      const data = {
        name: this.user.name,
        email: this.user.email,
        message: this.message
      };
      console.log('Message sent:', data);

      this.serviceService.createInquiries(data).subscribe({
        next: (res) => {
          console.log(res, "===res:loginnnnn");
          alert('Your Message Successfully Send')
          this.user = { name: '', email: '' };
          this.message = '';
          this.toggleChat();
        },
        error: (err) => {
          alert('Error in sending message: ' + err.message);
        }
      });
    }
  }
}
