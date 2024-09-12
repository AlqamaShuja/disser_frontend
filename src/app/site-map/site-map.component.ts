import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';

@Component({
  selector: 'app-site-map',
  templateUrl: './site-map.component.html',
  styleUrls: ['./site-map.component.css']
})
export class SiteMapComponent implements OnInit{
  samples:any[] = [];
  blogs:any[] = [];
  services:any[] = [];
  subServices:any[] = [];


  constructor(private blogsService:ServicesService){}
  
  ngOnInit(): void {
    this.blogsService.getSitemap().subscribe(res => {
      
      this.samples = res.data.sample;
      this.blogs  = res.data.blogs;
      this.services = res.data.services;
      this.subServices = res.data.subServices;
      console.log(res.data, 'resresresres');
      // this.generateSiteMap();
    })
  }

  // generateSiteMap():void{
  //   for(var i = 0;i < this.samples.length;i++){
  //     console.log('<url><loc>https://dissertationwriting.help/'+this.samples[i].Slug+'</loc></url>');
  //   }
  //   for(var i = 0;i < this.blogs.length;i++){
  //     console.log('<url><loc>https://dissertationwriting.help/'+this.blogs[i].pageSlug+'</loc></url>');
  //   }
  //   for(var i = 0;i < this.services.length;i++){
  //     console.log('<url><loc>https://dissertationwriting.help/'+this.services[i].pageSlug+'</loc></url>');
  //   }
    
  // }


}
