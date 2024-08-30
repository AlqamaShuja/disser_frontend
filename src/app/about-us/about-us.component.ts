import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { ServicesService } from '../services/services.service';
import { BASEURL } from 'src/globals';
import { Router } from '@angular/router';

interface Slide {
  imageUrl: string;
  heading: string;
  text: string;
  showAboutUs: boolean;
}


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
  slides: any = {};

  constructor(private serviceService: ServicesService, private router: Router){}

  parseDescription(data: string): any {
    try {
      return JSON.parse(data);
    } catch (error) {
      return data;
    }
  }

  ngOnInit(): void {
    this.serviceService.getSectionDataById(12).subscribe((res) => {
      this.slides = JSON.parse(res.description).map((sliderData: Slide) => ({ ...sliderData, imageUrl: `${BASEURL}files/${sliderData.imageUrl}` }))[0];
      console.log(this.slides, 'sli:scmkacacackaskc:sliderData');
    });

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

  navigateToOrder(){
    this.router.navigate(["/order"])
  }

}
