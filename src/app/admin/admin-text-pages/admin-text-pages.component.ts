import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';

interface TextPageList {
  id: number;
  title: string;
  description: string;
  page_name: string;
  extra_data: string;
  created_at: string;
  updated_at: string;
  unique_slug: string;
}

@Component({
  selector: 'app-admin-text-pages',
  templateUrl: './admin-text-pages.component.html',
  styleUrls: ['./admin-text-pages.component.css']
})
export class AdminTextPagesComponent implements OnInit, OnDestroy {
  textPages: TextPageList[] = [];
  private shouldFetchData: boolean = true;

  constructor(private servicesService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    if (this.shouldFetchData) {
      this.fetchData();
    }
  }

  ngOnDestroy(): void {
    // Set a flag if you want to refetch data when re-entering the component.
    this.shouldFetchData = true;
  }

  fetchData(): void {
    this.servicesService.getAllSectionData().subscribe((res) => {
      this.textPages = res;
      this.shouldFetchData = false; // Prevent refetching unless explicitly desired
      console.log(res, 'Fetched data');
      this.servicesService.getAllFAQs().subscribe((faqs) => {
        this.textPages = [
          ...res, 
          { 
            id: res.length, 
            title: 'FAQs', 
            page_name: 'FAQs', 
            unique_slug: 'all_faqs', 
            description: faqs, 
            extra_data: "{\"slug\": \"faqs\"}", 
            created_at: new Date(), 
            updated_at: new Date(), 
          },
        ]
        // this.servicesService.getAllTopic().subscribe((topics) => {
        //   this.textPages = [
        //     ...data, 
        //     { 
        //       id: topics.length, 
        //       title: 'Dissertation Topics', 
        //       page_name: 'Dissertation Topics', 
        //       unique_slug: 'all_dissertation_topics', 
        //       description: topics, 
        //       extra_data: "{\"slug\": \"dissertation_topics\"}", 
        //       created_at: new Date(), 
        //       updated_at: new Date(), 
        //     }
        //   ]
        // })
      })
    });
  }

  handleEdit(data: any): void {
    if(
      data?.title === 'FAQs' || data?.extra_data?.slug === 'faqs' || 
      data?.title === 'About Us Slider' || data?.extra_data?.slug === 'about_use_slider' ||
      data?.unique_slug === 'dont_just_take_our_world_about_us_page' || data?.extra_data?.slug === 'accordion_about_us'
      // data?.unique_slug === 'all_dissertation_topics' || data?.extra_data?.slug === 'dissertation_topics'
    ){
      this.router.navigate([`admin/text-pages/data/edit`], {
        queryParams: { data: JSON.stringify(data) },
      });
    }
    else {
      this.router.navigate([`admin/text-pages/${data.id}`], {
        queryParams: { data: JSON.stringify(data) },
      });
    }
  }
}

























// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { ServicesService } from 'src/app/services/services.service';

// interface TextPageList {
//   id: number,
//   title: string,
//   description: string,
//   page_name: string,
//   extra_data: string,
//   created_at: string,
//   updated_at: string,
// }


// @Component({
//   selector: 'app-admin-text-pages',
//   templateUrl: './admin-text-pages.component.html',
//   styleUrls: ['./admin-text-pages.component.css']
// })
// export class AdminTextPagesComponent implements OnInit  {
//   textPages: TextPageList[] = [];

//   constructor(private servicesService: ServicesService, private router: Router) { }

//   ngOnInit(): void {
//     // Initialize with some content; this could be dynamically fetched from an API
//     this.servicesService.getAllSectionData().subscribe((res) => {
//       this.textPages = res;
//       console.log(res, "ancasnjasjasncjasn");
      
//     });
//   }

//   handleEdit(data: TextPageList){
//     this.router.navigate([`admin/text-pages/${data.id}`], {
//       queryParams: { data: JSON.stringify(data) },
//     });
//   }
// }
