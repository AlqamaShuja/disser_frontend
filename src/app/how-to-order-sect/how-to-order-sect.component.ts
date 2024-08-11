import { Component } from '@angular/core';

@Component({
  selector: 'app-how-to-order-sect',
  templateUrl: './how-to-order-sect.component.html',
  styleUrls: ['./how-to-order-sect.component.css']
})
export class HowToOrderSectComponent {
  activeTab: string = 'submit';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }
}
