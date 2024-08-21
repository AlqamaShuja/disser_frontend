import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ServicesService } from '../services/services.service';
import { BASEURL } from 'src/globals';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  // BASEURL: string = 'http://localhost:3000/api/v1/files';
  // BASEURL: string = 'https://dissertationbackend.dissertationwriting.help/api/v1/files';
  aboutUsSectionBelowSlider: SafeHtml = '';
  accordionData: any;
  ourGoalOrMainObjectivesSection: SafeHtml = '';

  constructor(private serviceService: ServicesService){}

  parseDescription(data: string): any {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }

  ngOnInit(): void {
    this.serviceService.getSectionDataById(13).subscribe(res => {
      let { extra_data, description } = this.parseDescription(res);
      Object.keys(extra_data).forEach((key, i) => {
        const imageUrl = `${BASEURL}files/${encodeURIComponent(extra_data[key])}`;
        description = description.replace(`{{${key}}}`, imageUrl);
      });

      console.log(description, "===aboutUsSectionBelowSlider");
      
      this.aboutUsSectionBelowSlider = description;
    });
    
    this.serviceService.getSectionDataById(14).subscribe(res => {
      let { extra_data, description } = this.parseDescription(res);
      description = this.parseDescription(description);
      this.accordionData = description;
    });

    this.serviceService.getSectionDataById(15).subscribe(res => {
      let { extra_data, description } = this.parseDescription(res);
      description = this.parseDescription(description);
      Object.keys(extra_data).forEach((key, i) => {
        const imageUrl = `${BASEURL}files/${encodeURIComponent(extra_data[key])}`;
        description = description.replace(`{{${key}}}`, imageUrl);
      });
      this.ourGoalOrMainObjectivesSection = description;
    });
  }

}
