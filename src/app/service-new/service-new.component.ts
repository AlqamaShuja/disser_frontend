import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { ServiceData } from './service.model'; // Adjust the import path as necessary

@Component({
  selector: 'app-service-new',
  templateUrl: './service-new.component.html',
  styleUrls: ['./service-new.component.css']
})
export class ServiceNewComponent implements OnInit {
  services: ServiceData[] = [];
  selectedDescription: string = ''; // To display the description dynamically
  selectedService: any = {}; // To display the description dynamically
  showDescription: boolean = false; // To control whether to show the description or not
  imageHeight: string = '400px'

  constructor(
    private serviceService: ServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2 // For dynamic DOM manipulation
  ) {}

  ngOnInit(): void {
    // Fetch the list of services
    this.serviceService.getAllServices().subscribe((res) => {
      this.services = res;

      console.log(this.services,"=servicesservices");
      
      // Now check if there are query parameters on initialization
      this.route.queryParams.subscribe((params) => {
        const serviceId = params['serviceId'];
        const subServiceId = params['subService'];

        // Show description based on the service or sub-service selected
        if (serviceId) {
          this.showServiceDescription(serviceId);
          this.showDescription = true;
        } else if (subServiceId) {
          this.showSubServiceDescription(subServiceId);
          this.showDescription = true;
        } else {
          // Hide description and dummy text if no service or sub-service is selected
          this.showDescription = false;
          this.selectedDescription = '';
        }
      });
    });
  }

  // Update query params when clicking on service
  goToService(serviceId: number): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { serviceId: String(serviceId) }, // Convert number to string
      queryParamsHandling: 'merge', // Merge with existing query params
    });
  }

  // Update query params when clicking on sub-service
  goToSubService(subServiceId: number, event: Event): void {
    event.stopPropagation(); // Prevent the event from bubbling up to the parent service box
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { subService: String(subServiceId) }, // Convert number to string
      queryParamsHandling: 'merge',
    });
  }

  // Show service description based on serviceId
  showServiceDescription(serviceId: string): void {
    const service = this.services.find((s) => s.id === parseInt(serviceId, 10)); // Convert string to number for comparison
    this.selectedService = service;
    if (service) {
      this.selectedDescription = service.description; // Assign full description
      this.addImageAfterH1(); // Dynamically add images after each <h1>
    }
  }

  // Show sub-service description based on subServiceId
  showSubServiceDescription(subServiceId: string): void {
    for (const service of this.services) {
      const subService = service.subServices.find(
        (s) => s.id === parseInt(subServiceId, 10) // Convert string to number for comparison
      );
      if (subService) {
        this.selectedService = subService
        this.selectedDescription = subService.description; // Assign full description
        this.addImageAfterH1(); // Dynamically add images after each <h1>
        break;
      }
    }
  }

  // Function to dynamically add an image after each <h1> tag
  addImageAfterH1(): void {
    // Wait for Angular to render the description
    setTimeout(() => {
      const descriptionElement = this.el.nativeElement.querySelector('.description-container');
      if (descriptionElement) {
        // Get all <h1> elements
        const h1Element = descriptionElement.querySelector('h1'); // Select only the first <h1>
        if (h1Element) {
          // Create an img element
          const imgElement = this.renderer.createElement('img');
          this.renderer.setAttribute(imgElement, 'src', '../../assets/images/oursamples-business.jpg');
          this.renderer.setAttribute(imgElement, 'alt', 'Sample Image');
          this.renderer.setStyle(imgElement, 'margin', '20px 0');
          this.renderer.setStyle(imgElement, 'width', '100%');
          this.renderer.setStyle(imgElement, 'height', '500px');

          // Insert the image after the first <h1> tag
          this.renderer.insertBefore(
            descriptionElement,
            imgElement,
            h1Element.nextSibling
          );
        }
      }
    }, 0);
  }

}
