
import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-tasklist',
  templateUrl: './admin-tasklist.component.html',
  styleUrls: ['./admin-tasklist.component.css']
})
export class AdminTasklistComponent {
  orders = [
    {
      serial: 1,
      orderId: 'CH - 7905040',
      deadline: '9th July, 2024 10:28:29 PM',
      wordCount: '3900 words',
      paperType: 'CIPD Level 5 Assignment',
      finalDeadline: '15/07/2024 14:29',
      writer: 'Inhouse',
      submission_date: '2024-07-09'
    },
    {
      serial: 2,
      orderId: 'AE - 7905038',
      deadline: '5th July, 2024 12:44:16 AM',
      wordCount: '4500 words',
      paperType: 'CMI Assignment',
      finalDeadline: '05/07/2024 08:45',
      writer: 'Inhouse',
      submission_date: '2024-07-04'
    },
    {
      serial: 3,
      orderId: 'AB - 7905036',
      deadline: '8th July, 2024 11:53:24 PM',
      wordCount: '4000 words',
      paperType: 'Assignment',
      finalDeadline: '08/07/2024 08:45',
      writer: 'Inhouse',
      submission_date: '2024-07-08'
    },
    {
      serial: 4,
      orderId: 'AE - 7905032',
      deadline: '5th July, 2024 05:26:29 PM',
      wordCount: '800 words + (14 Slides)',
      paperType: 'Essay',
      finalDeadline: '05/07/2024 10:55',
      writer: 'Inhouse',
      submission_date: '2024-07-05'
    },
    {
      serial: 5,
      orderId: 'AB - 7905031',
      deadline: '8th July, 2024 02:41:12 PM',
      wordCount: '4000 words',
      paperType: 'CMI Assignment',
      finalDeadline: '08/07/2024 08:45',
      writer: 'Inhouse',
      submission_date: '2024-07-07'
    },
    {
      serial: 6,
      orderId: 'AB - 7905030',
      deadline: '8th July, 2024 02:35:19 PM',
      wordCount: '4000 words',
      paperType: 'CMI Assignment',
      finalDeadline: '',
      writer: 'Inhouse',
      submission_date: '2024-07-10'
    },
    {
      serial: 7,
      orderId: 'AE - 7905029',
      deadline: '8th July, 2024 12:56:52 PM',
      wordCount: '3600 words',
      paperType: 'Assignment',
      finalDeadline: '12/07/2024 18:00',
      writer: 'Inhouse',
      submission_date: '2024-07-12'
    },
    {
      serial: 8,
      orderId: 'AB - 7905027',
      deadline: '18th July, 2024 10:05:34 AM',
      wordCount: '4000 words',
      paperType: 'CMI Assignment',
      finalDeadline: '20/07/2024 18:00',
      writer: 'Inhouse',
      submission_date: '2024-07-15'
    },
    {
      serial: 9,
      orderId: 'AE - 7905026',
      deadline: '18th July, 2024 10:00:15 AM',
      wordCount: '4000 words',
      paperType: 'Assignment',
      finalDeadline: '',
      writer: 'Inhouse',
      submission_date: '2024-07-18'
    },
    {
      serial: 10,
      orderId: 'AE - 7905025',
      deadline: '18th July, 2024 09:57:44 AM',
      wordCount: '4000 words',
      paperType: 'Assignment',
      finalDeadline: '',
      writer: 'Inhouse',
      submission_date: '2024-07-20'
    },
    {
      serial: 11,
      orderId: 'AE - 7905023',
      deadline: '5th July, 2024 10:27:33 PM',
      wordCount: '4000 words',
      paperType: 'CIPD Level 7 Assignment',
      finalDeadline: '',
      writer: 'Inhouse',
      submission_date: '2024-07-01'
    },
    {
      serial: 12,
      orderId: 'AE - 7905020',
      deadline: '29th June, 2024 06:07:33 AM',
      wordCount: '0 words',
      paperType: 'Assignment',
      finalDeadline: '',
      writer: 'Inhouse',
      submission_date: '2024-06-29'
    },
    {
      serial: 13,
      orderId: 'AE - 7905019',
      deadline: '6th July, 2024 06:53:53 PM',
      wordCount: '2000 words',
      paperType: 'Assignment',
      finalDeadline: '',
      writer: 'Inhouse',
      submission_date: '2024-07-06'
    },
    {
      serial: 14,
      orderId: 'AE - 7905018',
      deadline: '6th July, 2024 06:34:19 AM',
      wordCount: '2000 words',
      paperType: 'Assignment',
      finalDeadline: '',
      writer: 'Inhouse',
      submission_date: '2024-07-04'
    }
  ];

  filteredOrders = this.orders;

  filterOrders(type: string) {
    const today = new Date();

    switch(type) {
      case 'home':
        this.filteredOrders = this.orders;
        break;
      case 'extremely-urgent':
        this.filteredOrders = this.orders.filter(order => {
          const diff = this.dateDiffInDays(today, new Date(order.submission_date));
          return diff <= 2 && diff >= 0;
        });
        break;
      case 'first-priority':
        this.filteredOrders = this.orders.filter(order => {
          const diff = this.dateDiffInDays(today, new Date(order.submission_date));
          return diff <= 5 && diff > 2;
        });
        break;
      case 'second-priority':
        this.filteredOrders = this.orders.filter(order => {
          const diff = this.dateDiffInDays(today, new Date(order.submission_date));
          return diff <= 10 && diff > 5;
        });
        break;
      case 'crossed':
        this.filteredOrders = this.orders.filter(order => {
          const diff = this.dateDiffInDays(today, new Date(order.submission_date));
          return diff < 0;
        });
        break;
      case 'no-urgency':
        this.filteredOrders = this.orders.filter(order => {
          const diff = this.dateDiffInDays(today, new Date(order.submission_date));
          return diff > 10;
        });
        break;
      default:
        this.filteredOrders = this.orders;
    }
  }

  dateDiffInDays(date1: Date, date2: Date) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
}
















// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-admin-tasklist',
//   templateUrl: './admin-tasklist.component.html',
//   styleUrls: ['./admin-tasklist.component.css']
// })
// export class AdminTasklistComponent {
//   orders = [
//     {
//       serial: 1,
//       orderId: 'CH - 7905040',
//       deadline: '9th July, 2024 10:28:29 PM',
//       wordCount: '3900 words',
//       paperType: 'CIPD Level 5 Assignment',
//       finalDeadline: '15/07/2024 14:29',
//       writer: 'Inhouse',
//       submission_date: '2024-07-09'
//     },
//     {
//       serial: 2,
//       orderId: 'AE - 7905038',
//       deadline: '5th July, 2024 12:44:16 AM',
//       wordCount: '4500 words',
//       paperType: 'CMI Assignment',
//       finalDeadline: '05/07/2024 08:45',
//       writer: 'Inhouse',
//       submission_date: '2024-07-04'
//     },
//     {
//       serial: 3,
//       orderId: 'AB - 7905036',
//       deadline: '8th July, 2024 11:53:24 PM',
//       wordCount: '4000 words',
//       paperType: 'Assignment',
//       finalDeadline: '08/07/2024 08:45',
//       writer: 'Inhouse',
//       submission_date: '2024-07-08'
//     },
//     {
//       serial: 4,
//       orderId: 'AE - 7905032',
//       deadline: '5th July, 2024 05:26:29 PM',
//       wordCount: '800 words + (14 Slides)',
//       paperType: 'Essay',
//       finalDeadline: '05/07/2024 10:55',
//       writer: 'Inhouse',
//       submission_date: '2024-07-05'
//     },
//     {
//       serial: 5,
//       orderId: 'AB - 7905031',
//       deadline: '8th July, 2024 02:41:12 PM',
//       wordCount: '4000 words',
//       paperType: 'CMI Assignment',
//       finalDeadline: '08/07/2024 08:45',
//       writer: 'Inhouse',
//       submission_date: '2024-07-07'
//     },
//     {
//       serial: 6,
//       orderId: 'AB - 7905030',
//       deadline: '8th July, 2024 02:35:19 PM',
//       wordCount: '4000 words',
//       paperType: 'CMI Assignment',
//       finalDeadline: '',
//       writer: 'Inhouse',
//       submission_date: '2024-07-10'
//     },
//     {
//       serial: 7,
//       orderId: 'AE - 7905029',
//       deadline: '8th July, 2024 12:56:52 PM',
//       wordCount: '3600 words',
//       paperType: 'Assignment',
//       finalDeadline: '12/07/2024 18:00',
//       writer: 'Inhouse',
//       submission_date: '2024-07-12'
//     },
//     {
//       serial: 8,
//       orderId: 'AB - 7905027',
//       deadline: '18th July, 2024 10:05:34 AM',
//       wordCount: '4000 words',
//       paperType: 'CMI Assignment',
//       finalDeadline: '20/07/2024 18:00',
//       writer: 'Inhouse',
//       submission_date: '2024-07-15'
//     },
//     {
//       serial: 9,
//       orderId: 'AE - 7905026',
//       deadline: '18th July, 2024 10:00:15 AM',
//       wordCount: '4000 words',
//       paperType: 'Assignment',
//       finalDeadline: '',
//       writer: 'Inhouse',
//       submission_date: '2024-07-18'
//     },
//     {
//       serial: 10,
//       orderId: 'AE - 7905025',
//       deadline: '18th July, 2024 09:57:44 AM',
//       wordCount: '4000 words',
//       paperType: 'Assignment',
//       finalDeadline: '',
//       writer: 'Inhouse',
//       submission_date: '2024-07-20'
//     },
//     {
//       serial: 11,
//       orderId: 'AE - 7905023',
//       deadline: '5th July, 2024 10:27:33 PM',
//       wordCount: '4000 words',
//       paperType: 'CIPD Level 7 Assignment',
//       finalDeadline: '',
//       writer: 'Inhouse',
//       submission_date: '2024-07-01'
//     },
//     {
//       serial: 12,
//       orderId: 'AE - 7905020',
//       deadline: '29th June, 2024 06:07:33 AM',
//       wordCount: '0 words',
//       paperType: 'Assignment',
//       finalDeadline: '',
//       writer: 'Inhouse',
//       submission_date: '2024-06-29'
//     },
//     {
//       serial: 13,
//       orderId: 'AE - 7905019',
//       deadline: '6th July, 2024 06:53:53 PM',
//       wordCount: '2000 words',
//       paperType: 'Assignment',
//       finalDeadline: '',
//       writer: 'Inhouse',
//       submission_date: '2024-07-06'
//     },
//     {
//       serial: 14,
//       orderId: 'AE - 7905018',
//       deadline: '6th July, 2024 06:34:19 AM',
//       wordCount: '2000 words',
//       paperType: 'Assignment',
//       finalDeadline: '',
//       writer: 'Inhouse',
//       submission_date: '2024-07-04'
//     }
//   ];

//   filteredOrders = this.orders;

//   filterOrders(type: string) {
//     const today = new Date();

//     switch(type) {
//       case 'home':
//         this.filteredOrders = this.orders;
//         break;
//       case 'extremely-urgent':
//         this.filteredOrders = this.orders.filter(order => {
//           const diff = this.dateDiffInDays(today, new Date(order.submission_date));
//           return diff <= 2;
//         });
//         break;
//       case 'first-priority':
//         this.filteredOrders = this.orders.filter(order => {
//           const diff = this.dateDiffInDays(today, new Date(order.submission_date));
//           return diff <= 5;
//         });
//         break;
//       case 'second-priority':
//         this.filteredOrders = this.orders.filter(order => {
//           const diff = this.dateDiffInDays(today, new Date(order.submission_date));
//           return diff <= 10;
//         });
//         break;
//       case 'crossed':
//         this.filteredOrders = this.orders.filter(order => {
//           const diff = this.dateDiffInDays(today, new Date(order.submission_date));
//           return diff < 0;
//         });
//         break;
//       case 'no-urgency':
//         this.filteredOrders = this.orders.filter(order => {
//           const diff = this.dateDiffInDays(today, new Date(order.submission_date));
//           return diff > 10;
//         });
//         break;
//       default:
//         this.filteredOrders = this.orders;
//     }
//   }

//   dateDiffInDays(date1: Date, date2: Date) {
//     const _MS_PER_DAY = 1000 * 60 * 60 * 24;
//     const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
//     const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
//     return Math.floor((utc2 - utc1) / _MS_PER_DAY);
//   }
// }
