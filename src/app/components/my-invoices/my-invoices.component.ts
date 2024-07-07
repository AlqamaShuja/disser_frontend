import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-my-invoices',
  templateUrl: './my-invoices.component.html',
  styleUrls: ['./my-invoices.component.css']
})
export class MyInvoicesComponent {
  @Input()
  invoices:any;

  formatDatabaseTimestamp(databaseTimestamp: string): string {
    // Convert the database timestamp to a JavaScript Date object
    const date = new Date(databaseTimestamp);
  
    // Options for formatting the date and time
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true, // Use 12-hour format with AM/PM
    };
  
    // Format the date using Intl.DateTimeFormat
    const formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
  
    // Extract the day of the month and add "th," "st," or "nd" as appropriate
    const day = date.getDate();
    let daySuffix = 'th';
  
    if (day === 1 || day === 21 || day === 31) {
      daySuffix = 'st';
    } else if (day === 2 || day === 22) {
      daySuffix = 'nd';
    } else if (day === 3 || day === 23) {
      daySuffix = 'rd';
    }
  
    // Replace 'th' in the formatted date with the appropriate suffix
    const formattedDateWithSuffix = formattedDate.replace(/th/g, daySuffix);
  
    return formattedDateWithSuffix;
  }
}
