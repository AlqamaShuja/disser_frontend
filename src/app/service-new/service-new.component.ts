import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { ServiceData } from './service.model'; // Adjust the import path as necessary

@Component({
  selector: 'app-service-new',
  templateUrl: './service-new.component.html',
  styleUrls: ['./service-new.component.css']
})
export class ServiceNewComponent implements OnInit {
  services: ServiceData[] = [];

  constructor(private serviceService: ServicesService) { }

  ngOnInit(): void {
    // this.serviceService.getAllServices().subscribe((res) => {
    //   console.log(res, "====res.data:serviceeeesss");
    //   this.services = res;
    // });
  }
}
