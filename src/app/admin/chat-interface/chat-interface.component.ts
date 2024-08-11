import { Component, OnInit } from '@angular/core';
// import { io, Socket } from 'socket.io-client';

interface TextMessage {
  senderId: string;
  receiverId: string;
  text: string;
  sendBy: string;
  time: Date;
  isRead: boolean;
}

interface MediaMessage {
  senderId: string;
  receiverId: string;
  type: 'image' | 'video' | 'document';
  content: any;
  filename: string;
  time: Date;
  isRead: boolean;
  sendBy: string;
}

type Message = TextMessage | MediaMessage;

@Component({
  selector: 'app-chat-interface',
  templateUrl: './chat-interface.component.html',
  styleUrls: ['./chat-interface.component.css']
})
export class ChatInterfaceComponent implements OnInit {
  users = [
    { name: 'User1', lastMessage: 'Hello', avatar: "../../../assets/user.png", id: 'user1_id' },
    { name: 'User2', lastMessage: 'Hi', avatar: "../../../assets/user.png", id: 'user2_id' },
    // Add more users here
  ];

  selectedUser: any;
  newMessage: string = '';
  messages: Message[] = [ 
    // Example messages
    { senderId: 'user1_id', receiverId: 'admin_id', text: 'Hello, how are you?', time: new Date(), isRead: false, sendBy: 'user' },
    { senderId: 'admin_id', receiverId: 'user1_id', text: 'I am fine, thank you!', time: new Date(), isRead: true, sendBy: 'admin' },
    // Add more example messages here
  ];

  // socket: Socket;
  socket: string = '';

  constructor() {
    // this.socket = io('http://localhost:3000'); // Replace with your backend URL
  }

  ngOnInit() {
  //   this.socket.on('message', (message: Message) => {
  //     this.messages.push(message);
  //   });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    // Fetch messages for the selected user here
  }

  sendMessage() {
    if (this.newMessage.trim() !== '') {
      const message: TextMessage = {
        senderId: 'current_user_id', // Replace with actual sender ID
        receiverId: this.selectedUser.id,
        text: this.newMessage,
        time: new Date(),
        isRead: false,
        sendBy: 'admin',
      };
      this.messages.push(message);
      // this.socket.emit('message', message);
      this.newMessage = '';
    }
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const content = e.target.result;
        let type: 'image' | 'video' | 'document' = 'document';
        if (file.type.startsWith('image/')) {
          type = 'image';
        } else if (file.type.startsWith('video/')) {
          type = 'video';
        }
        const message: MediaMessage = {
          senderId: 'current_user_id', // Replace with actual sender ID
          receiverId: this.selectedUser.id,
          type: type,
          content: content,
          filename: file.name,
          time: new Date(),
          isRead: false,
          sendBy: 'admin'
        };
        this.messages.push(message);
        // this.socket.emit('message', message);
      };
      reader.readAsDataURL(file);
    }
  }

  isTextMessage(message: Message): message is TextMessage {
    return (message as TextMessage).text !== undefined;
  }

  isMediaMessage(message: Message): message is MediaMessage {
    return (message as MediaMessage).type !== undefined;
  }
}
