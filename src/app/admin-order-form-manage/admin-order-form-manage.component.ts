import { Component } from '@angular/core';
import { AcademicLevelComponent } from '../admin/academic-level/academic-level.component';


@Component({
  selector: 'app-admin-order-form-manage',
  templateUrl: './admin-order-form-manage.component.html',
  styleUrls: ['./admin-order-form-manage.component.css']
})
export class AdminOrderFormManageComponent {
  selectedTab: string = 'service-tab'; // Default tab

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }
}
