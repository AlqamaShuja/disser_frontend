import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-service-list',
  templateUrl: './service-list.component.html',
  styleUrls: ['./service-list.component.css']
})
export class ServiceListComponent implements OnInit{
  services: any[] = [];
  constructor(private serviceService: ServicesService){}
  ngOnInit(): void {
    this.serviceService.getAllServices().subscribe((res: any) => {
      this.services = res.data;
    });
  }

}
