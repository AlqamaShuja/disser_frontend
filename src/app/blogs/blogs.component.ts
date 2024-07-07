import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit{
 blogs:any[] = [];

  constructor(private serviceService:ServicesService,private router:Router,private globalService:GlobalService){}
  ngOnInit():void{
    this.serviceService.getAllBlogs().subscribe((res:any)=>{
      this.blogs = res.data;
    });
  }
 selectBlog(blog:any):void{
  this.globalService.selectedBlog$.next(blog);
  this.router.navigate(['/blog/'+blog['pageSlug']]);
 }
}
