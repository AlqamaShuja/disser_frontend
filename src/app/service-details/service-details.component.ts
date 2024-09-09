import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlobalService } from '../services/global.service';
import { ServicesService } from '../services/services.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  selectedService: any;
  loading: boolean = true; // Introduce a loading flag

  constructor(
    private globalService: GlobalService,
    private sanitizer: DomSanitizer,
    private serviceService: ServicesService,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const slug = params.get('slug');
      this.getServices(slug);
    });
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  getServices(slug: any): void {
    this.loading = true; // Set loading to true when starting to fetch data

    this.serviceService.getAllSingleServices(slug).subscribe(
      (res: any) => {
        this.selectedService = res.data;
        console.log(this.selectedService, 'THE SELECTED SERVICE');
        this.loading = false; // Set loading to false when data is loaded
      },
      (error: any) => {
        console.error('Error fetching service data:', error);
        this.loading = false; // Ensure loading is set to false even in case of an error
      }
    );
  }
}
