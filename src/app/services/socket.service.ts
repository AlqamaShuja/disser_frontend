import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable, BehaviorSubject } from 'rxjs';
import { BACKEND_BASEURL } from 'src/globals';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private socket!: Socket; // Use definite assignment assertion
  private readonly SOCKET_URL: string = BACKEND_BASEURL; // Replace with your server URL
  // private readonly SOCKET_URL: string = 'http://localhost:3000'; // Replace with your server URL
  private isConnected: boolean = false; // To track connection status
  private connectionStatus$ = new BehaviorSubject<boolean>(false); // Observable to emit connection status changes

  constructor() {
    this.connect(); // Initialize the connection when the service is instantiated
  }

  // Connect to the socket server with authorization token
  connect(): void {
    const token = localStorage.getItem('token'); // Fetch the token from localStorage

    if (!this.isConnected) { // Prevent reconnection if already connected
      this.socket = io(this.SOCKET_URL, {
        transports: ['websocket', 'polling'], // Fallback to polling if websocket is not available
        auth: {
          token: token // Pass token as an authorization header
        },
      });

      // Listen for connection established event
      this.socket.on('connect', () => {
        console.log('Socket connected:', this.socket.id);
        this.isConnected = true; // Update the connection status
        this.connectionStatus$.next(true); // Emit the connection status change
      });

      // Listen for connection errors and attempt reconnection
      this.socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
        this.isConnected = false; // Update the connection status
        this.connectionStatus$.next(false); // Emit the connection status change
        setTimeout(() => this.connect(), 5000); // Retry connection after a delay
      });

      // Listen for disconnect event
      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
        this.isConnected = false; // Update the connection status
        this.connectionStatus$.next(false); // Emit the connection status change
      });
    }
  }

  // Emit a new message to the server
  emitMessage(event: string, data: any): void {
    if (this.isConnected) { // Only emit if connected
      this.socket.emit(event, data);
    } else {
      console.error('Cannot emit message, socket is not connected.');
    }
  }

  // Listen for messages from the server
  onMessage(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => {
        subscriber.next(data);
      });

      // Clean up the socket listener on unsubscribe
      return () => this.socket.off(event);
    });
  }

  // Disconnect the socket
  disconnect(): void {
    if (this.isConnected) {
      this.socket.disconnect();
    }
  }

  // Reconnect the socket
  reconnect(): void {
    if (!this.isConnected) {
      this.connect();
    }
  }

  // Observable to monitor connection status
  getConnectionStatus(): Observable<boolean> {
    return this.connectionStatus$.asObservable();
  }
}





























// // src/app/services/socket.service.ts
// import { Injectable } from '@angular/core';
// import { io, Socket } from 'socket.io-client';
// import { Observable } from 'rxjs';
// import { BACKEND_BASEURL } from 'src/globals';

// @Injectable({
//   providedIn: 'root',
// })
// export class SocketService {
//   private socket!: Socket;
//   private readonly SOCKET_URL: string = BACKEND_BASEURL; // Replace with your server URL

//   constructor() {
//     this.connect();
//   }

//   parseData(data: any){
//     try {
//         return JSON.parse(data);
//     } catch (error) {
//         return data;
//     }
//   }

//   // Connect to the socket server with authorization token
//   connect(): void {
//     const token = this.parseData(localStorage.getItem('token')); // Fetch the token from localStorage

//     if(!token) return;
//     this.socket = io(this.SOCKET_URL, {
//       transports: ['websocket', 'polling'], // Fallback to polling if websocket is not available
//       auth: {
//         token: token,
//       },
//     });

//     // Listen for connection errors and attempt reconnection
//     this.socket.on('connect_error', (err) => {
//       console.error('Connection error:', err);
//       setTimeout(() => this.connect(), 5000); // Retry connection after a delay
//     });
//   }

//   // Emit a new message to the server
//   emitMessage(event: string, data: any): void {
//     this.socket.emit(event, data);
//   }

//   // Listen for messages from the server
//   onMessage(event: string): Observable<any> {
//     return new Observable((subscriber) => {
//       this.socket.on(event, (data) => {
//         subscriber.next(data);
//       });

//       // Clean up the socket listener on unsubscribe
//       return () => this.socket.off(event);
//     });
//   }

//   // Disconnect the socket
//   disconnect(): void {
//     if (this.socket) {
//       this.socket.disconnect();
//     }
//   }

//   // Reconnect the socket
//   reconnect(): void {
//     if (this.socket && !this.socket.connected) {
//       this.socket.connect();
//     }
//   }
// }
