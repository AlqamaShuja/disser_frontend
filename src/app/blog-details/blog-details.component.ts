import { Component } from '@angular/core';
import { GlobalService } from '../services/global.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent {
  selectedBlog:any;

  constructor(private globalService:GlobalService,private sanitizer: DomSanitizer){
    this.globalService.selectedBlog$.subscribe((res:any)=>{
      this.selectedBlog = res;
    })
  }
  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
