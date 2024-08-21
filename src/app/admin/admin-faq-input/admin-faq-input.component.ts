import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/services/services.service';
import { BASEURL } from 'src/globals';

interface FAQs {
  id: number, 
  title: string, 
  content: string
}

interface Slide {
  imageUrl: string;
  heading: string;
  text: string;
  showAboutUs: boolean;
}

interface Topic {
  id: number;
  title: string;
  price: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}



@Component({
  selector: 'app-admin-faq-input',
  templateUrl: './admin-faq-input.component.html',
  styleUrls: ['./admin-faq-input.component.css']
})
export class AdminFaqInputComponent implements OnInit {
  faqs: FAQs[] = [];
  aboutUsSlider: Slide[] = [];
  uploadedImages: File[] = [];
  // BASEURL: string = 'https://dissertationbackend.dissertationwriting.help/api/v1/'
  // BASEURL: string = 'http://localhost:3000/api/v1/';
  allData: any;
  aboutUsAccordion: any;
  // dissertationTopics: Topic[] = [];
  isAboutUsSlider: boolean = false;
  isAboutUsAccordion: boolean = false;
  isFaq: boolean = false;
  // isDissertationTopics: boolean = false;

  constructor(
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  parseDescription(description: string): any {
    try {
      return JSON.parse(description);
    } catch (error) {
      return description;
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      const parsedData = JSON.parse(data);
      this.allData = parsedData;

      // console.log(parsedData, "====parsedDaaatatatattata");
      

      if (parsedData.title?.toLowerCase() === 'faqs' || parsedData.extra_data?.slug?.toLowerCase() === 'faqs') {
        this.faqs = parsedData.description || [];
        this.isFaq = true
      } else if (parsedData.title?.toLowerCase() === 'about us slider' || parsedData.extra_data?.slug?.toLowerCase() === 'about_us_slider') {
        this.aboutUsSlider = this.parseDescription(parsedData.description || []);
        this.isAboutUsSlider = true
        console.log(this.aboutUsSlider, "==parsedData.description");
      } else if (parsedData.unique_slug?.toLowerCase() === 'dont_just_take_our_world_about_us_page' || parsedData.extra_data?.slug?.toLowerCase() === "accordion_about_us") {
        this.aboutUsAccordion = this.parseDescription(parsedData.description || []);
        this.aboutUsAccordion = true
        console.log(this.aboutUsAccordion, "==parsedData.description:accordion");
      } 
      // else if (parsedData.unique_slug?.toLowerCase() === 'all_dissertation_topics' || parsedData.extra_data?.slug?.toLowerCase() === "dissertation_topics") {
      //   this.dissertationTopics = this.parseDescription(parsedData.description || []);
      //   this.isDissertationTopics = true
      //   console.log(this.dissertationTopics, "==parsedData.description:accordion");
      // }
    });
  }

  // ngOnInit(): void {
  //   this.route.queryParams.subscribe(params => {
  //     const data = params['data'];
  //     const parsedData = JSON.parse(data);
  //     this.allData = parsedData;

  //     if(parsedData.title === 'FAQs' || parsedData.title?.toLowerCase() === 'faqs' || parsedData.extra_data?.slug?.toLowerCase() === 'faqs'){
  //       this.faqs = parsedData.description;
  //     }
  //     else if(parsedData.title === 'About Us Slider' || parsedData.title?.toLowerCase() === 'about us slider' || parsedData.extra_data?.slug?.toLowerCase() === 'about_use_slider'){
  //       const data = this.parseDescription(parsedData.description);
  //       this.aboutUsSlider = data.map((d: any) => ({ ...d, showAboutUs: (d.showAboutUs === 'false' || !d.showAboutUs) ? false: true, }))
  //       console.log(this.aboutUsSlider, "==parsedData.description");
  //     }
  //     else if(parsedData.page_name?.toLowerCase() === 'dont_just_take_our_world_about_us_page' || parsedData.extra_data?.slug?.toLowerCase() === "accordion_about_us"){
  //       this.aboutUsAccordion = this.parseDescription(parsedData.description);
  //       console.log(this.aboutUsAccordion, "==parsedData.description:accordion");
  //     }
  //   });
  // }

  getImageUrl(slide: Slide, index: number): string | ArrayBuffer | null {
    return this.uploadedImages[index] ? URL.createObjectURL(this.uploadedImages[index]) : `${BASEURL}files/${slide.imageUrl}`;
  }

  onImageSelect(event: Event, index: number): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.uploadedImages[index] = input.files[0];
    }
  }

  goBack(): void {
    this.router.navigate([`/admin/text-pages`]);
  }

  saveChangesFAQs(): void {
    console.log('FAQs updated:', this.faqs);
    this.servicesService.updateMultiple(this.faqs).subscribe(
      response => {
        console.log('Content saved successfully:', response);
        alert("Successfully Updated");
      },
      error => {
        console.error('Error saving content:', error);
        alert("Error Updating Content: " + error.message);
      }
    );
  }

  updateSliderData(): void {
    const formData = new FormData();

    // Add updated slide data
    this.aboutUsSlider.forEach((slide, index) => {
      formData.append(`slides[${index}][heading]`, slide.heading);
      formData.append(`slides[${index}][text]`, slide.text);
      formData.append(`slides[${index}][showAboutUs]`, slide.showAboutUs.toString());

      // If a new image was uploaded, add it to the FormData
      if (this.uploadedImages[index]) {
        formData.append(`slides[${index}][image]`, this.uploadedImages[index]);
      } else {
        formData.append(`slides[${index}][imageUrl]`, slide.imageUrl);
      }
    });

    formData.forEach((value, key) => {
      console.log(`${key}: ${value}`);
    })

    this.servicesService.updateSlides(this.allData.id, formData).subscribe(
      response => {
        console.log('Slides updated successfully:', response);
        alert("Successfully Updated");
      },
      error => {
        console.error('Error saving slides:', error);
        alert("Error Updating Slides: " + error.message);
      }
    );
  }

  saveChangesAccordion(): void {
    console.log('Accordion updated:', this.aboutUsAccordion);
    this.servicesService.updateAboutUsAccordion(this.allData.id, { description: this.aboutUsAccordion }).subscribe(
      response => {
        console.log('Content saved successfully:', response);
        alert("Successfully Updated");
      },
      error => {
        console.error('Error saving content:', error);
        alert("Error Updating Content: " + error.message);
      }
    );
  }
  
  // updateTopicsData(topic: Topic): void {
  //   console.log(topic,  'Diss Topics updated:', this.dissertationTopics);
  //   this.servicesService.updateTopic(topic.id, topic).subscribe(
  //     response => {
  //       console.log('Topic saved successfully:', response);
  //       alert("Successfully Updated");
  //     },
  //     error => {
  //       console.error('Error saving Topic:', error);
  //       alert("Error Updating Topic: " + error.message);
  //     }
  //   );
  // }

}
