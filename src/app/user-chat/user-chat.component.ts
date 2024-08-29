import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ServicesService } from 'src/app/services/services.service';
import { SocketService } from 'src/app/services/socket.service';
import { BASEURL } from 'src/globals';

export interface Message {
  id: number | null;
  content: string | null;
  attachment: string | null;
  senderId: string;
  receiverId: string;
  sendBy: 'auth' | 'admin';
  isReceiverRead: boolean;
  created_at: Date;
  updated_at: Date;
}

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  admin: any;
  users: any = [];
  selectedUser: any;
  newMessage: string = '';
  messages: Message[] = [];
  loadingMessages: boolean = false; // Flag to indicate loading state
  newMsgCounts: any = {};

  constructor(private socketService: SocketService, private authService: AuthService, private fileUploadService: ServicesService) {}

  ngOnInit() {
    if (localStorage) {
      const admin = JSON.parse(localStorage.getItem("user") || "{}");
      this.admin = admin;
    }

    this.authService.getAllAdmin().subscribe(res => {
      console.log(res, '+=acmakcakca:userList');
      this.users = res.data;
    });
    
    this.fileUploadService.getNewMessagesCounts(this.admin.uid).subscribe(res => {
      console.log(res, '+=acmakcakca:newMsgggCounttssssss');
      this.newMsgCounts = res;
    });

    this.socketService.getConnectionStatus().subscribe((isConnected) => {
      console.log('Socket connection status:', isConnected);
    });

    // Listen for new messages
    this.socketService.onMessage('newMessage').subscribe((message: Message) => {
      this.messages.push(message);
      console.log(this.newMsgCounts, "=====newMsgCountssss");
      
      let msgCount = { ...this.newMsgCounts };
      msgCount[message.senderId] = (msgCount[message.senderId] || 0) + 1;
      this.newMsgCounts = msgCount; 
      console.log('Received new message:', message);
    });

    // Optionally, listen for read receipts or other events
    this.socketService.onMessage('messageRead').subscribe((data) => {
      console.log('Message read status updated:', data);
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    this.loadingMessages = true; // Set loading state to true
    this.fileUploadService.getUserMessages(this.admin.uid, user.uid).subscribe(res => {
      console.log(res, "==messagesssssssssssss");
      this.messages = res;
      this.loadingMessages = false; // Set loading state to false after messages are loaded
    }, error => {
      console.error('Error fetching messages:', error);
      this.loadingMessages = false; // Set loading state to false on error
    });

    this.fileUploadService.updateMsgStatus(this.admin.uid, user.uid).subscribe(res => {
      console.log(res, "=====res,msgStatusUpdatedddd");
    })

    const msgCount = { ...this.newMsgCounts };
    delete msgCount[user.uid];
    this.newMsgCounts = msgCount;
  }

  getImageUrl(imageKey: string | null): string {
    if (!imageKey) {
      return ''; // Return an empty string if the image key is null
    }
    return `${BASEURL}files/${imageKey}`;
  }

  sendMessage() {
    // const admin = JSON.parse(localStorage.getItem("admin") || "{}");
    if (this.newMessage.trim() !== '') {
      const message: Message = {
        id: 0,
        senderId: this.admin.uid,
        receiverId: this.selectedUser.uid,
        content: this.newMessage,
        attachment: null,
        created_at: new Date(),
        updated_at: new Date(),
        isReceiverRead: false,
        sendBy: 'auth',
      };
      this.messages.push(message);
      this.socketService.emitMessage('newMessage', message); // Emit message through socket
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
      // const admin = JSON.parse(localStorage.getItem("admin") || "{}");

      // Create a temporary message object to display immediately
      const tempMessage: Message = {
        id: 0,
        senderId: this.admin.uid,
        receiverId: this.selectedUser.uid,
        content: null,
        attachment: file.name,
        created_at: new Date(),
        updated_at: new Date(),
        isReceiverRead: false,
        sendBy: 'auth',
      };

      // Add the temporary message to the chat interface immediately
      this.messages.push(tempMessage);

      // Start uploading the file in the background
      this.fileUploadService.uploadFile(file).subscribe(
        (response: any) => {
          if (response && response.filename) {
            // Find the index of the tempMessage in the messages array
            const tempIndex = this.messages.findIndex(msg => msg === tempMessage);

            if (tempIndex !== -1) {
              // Update the message in the chat interface with the response data
              this.messages[tempIndex] = {
                ...tempMessage,
                id: response.id, // Assuming response contains a unique id for the message
                attachment: response.filename, // Update with the uploaded filename
                updated_at: new Date(),
              };

              // Emit the message through socket after upload success
              this.socketService.emitMessage('newMessage', this.messages[tempIndex]);
            }
          }
        },
        (error) => {
          console.error('File upload error:', error);
          // Optional: Remove or update the temporary message to indicate failure
        }
      );
    }
  }

  isTextMessage(message: Message): boolean {
    return message.content !== null && message.attachment === null;
  }

  isMediaMessage(message: Message): boolean {
    return message.content === null && message.attachment !== null;
  }

  downloadFile(fileUrl: string) {
    if (!fileUrl) {
      console.error('Invalid file URL for download.');
      return;
    }
  
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = fileUrl.split('/').pop() || 'download';
    link.click();
  }
}
