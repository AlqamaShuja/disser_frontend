// import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ViewChild, ViewEncapsulation, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { ServicesService } from '../services/services.service';
import { AcademicLevelData } from './home.model';
import * as Aos from 'aos';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BASEURL, getDiffInDays } from 'src/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit, AfterViewInit {
  // BASEURL: string = 'http://localhost:3000/api/v1/files';
  apiUrl: string = `${BASEURL}files`;
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  topics: any[] = [];
  sortedTopics: any[] = [];
  orderPriceByDate: any[] = [];
  selectedTopic: any;
  errorMessage: string = '';
  calcSectBg: string = '';
  sliderData: SafeHtml = '';
  academicLevels: AcademicLevelData[] = [
    // { id: 1, title: 'Undergraduate', price: 5 },
    // { id: 2, title: 'Graduate', price: 10 },
    // { id: 3, title: 'PhD', price: 15 },
  ];
  serviceType: AcademicLevelData[] = [
    // { title: 'Dissertation Full', price: 15 }, 
    // { title: 'Dissertation Proposal', price: 30 }
  ];
  totalPrice: number = 0;
  costPerPage: number = 0;

  ourMissionLeftContent: SafeHtml = '';
  ourMissionLeftContentImage1: string = '';
  ourMissionLeftContentImage2: string = '';
  ourMissionRightContent: SafeHtml = '';
  beingAGoodResidential: SafeHtml = '';
  assistantInfo: SafeHtml = '';
  whyChooseUsSection: SafeHtml = '';
  whatMakesUsTheBest: SafeHtml = '';
  howToOrder: SafeHtml = '';
  qualityGuaranteed: SafeHtml = '';
  personalManagerToAssistYou: SafeHtml = '';
  improvesYourGradeWithUs: SafeHtml = '';

  @ViewChildren('radioButton') radioButtons!: QueryList<any>;
  @ViewChild('dissertationForm', { static: true }) dissertationForm!: NgForm;
  @ViewChild('dynamicContent', { static: true }) dynamicContent!: ElementRef;
  @ViewChild('ourMissionLeftDynamicContent', { static: true }) ourMissionLeftDynamicContent!: ElementRef;

  constructor(private servicesService: ServicesService, private sanitizer: DomSanitizer, private router: Router) { }

  // ngOnInit(): void {
  //   Aos.init();
  //   this.servicesService.getAllSectionData().subscribe((res) => {
  //     console.log(res, "=====res:contenttt");
      
  //     for (let i = 0; i < res.length; i++) {
  //       console.log("hello start i = ", i);
  //       if (res[i].id === 1) {
  //         let content = JSON.parse(res[i].description);
  //         this.calcSectBg = `${this.apiUrl}/${encodeURIComponent(res[i].extra_data.background_image)}`;
  //         console.log(content, "===contenttttttttttttt");
          
  //         this.sliderData = this.sanitizer.bypassSecurityTrustHtml(content);
  //         this.dynamicContent.nativeElement.innerHTML = this.sliderData;
  //       }
  //       else if(res[i].id === 2){
  //         console.log(res[i], "===asncjasjsasja:res[i]");
  //         let content = JSON.parse(res[i].description);
  //         this.ourMissionLeftContent = this.sanitizer.bypassSecurityTrustHtml(content);
  //         this.ourMissionLeftDynamicContent.nativeElement.innerHTML = this.ourMissionLeftContent;
  //         this.ourMissionLeftContentImage1 = `${this.apiUrl}/${encodeURIComponent(res[i].extra_data.background_image1)}`;
  //         this.ourMissionLeftContentImage2 = `${this.apiUrl}/${encodeURIComponent(res[i].extra_data.background_image2)}`;
  //       }
  //       console.log("hello end i = ", i);
  //     }
  //   });
  //   this.servicesService.getAllTopic().subscribe((res) => {
  //     this.topics = res;
  //     this.sortedTopics = res;
  //   });
  // }


  parseDescription(description: string): any {
    try {
      return JSON.parse(description);
    } catch (error) {
      return description;
    }
  }

  ngOnInit(): void {
    Aos.init();
    this.servicesService.getAllSectionData().subscribe((res) => {
      console.log(res, "=====res:contenttt");
      for (let i = 0; i < res.length; i++) {
        let parsedContent = this.parseDescription(res[i].description);
        let extra_data = this.parseDescription(res[i].extra_data);
        console.log(parsedContent, "===parsedContenttttttttttttt, ", extra_data, " === extra_data");
        if (res[i].id === 1) {
          // let content = parsedContent;
          this.calcSectBg = `${this.apiUrl}/${encodeURIComponent(extra_data.background_image)}`;
          this.sliderData = this.sanitizer.bypassSecurityTrustHtml(parsedContent);
        }
        else if(res[i].id === 2){
          // let content = parsedContent;
          this.ourMissionLeftContent = this.sanitizer.bypassSecurityTrustHtml(parsedContent);
          this.ourMissionLeftContentImage1 = `${this.apiUrl}/${encodeURIComponent(extra_data.background_image1)}`;
          this.ourMissionLeftContentImage2 = `${this.apiUrl}/${encodeURIComponent(extra_data.background_image2)}`;
        }
        else if(res[i].id === 3){
          this.ourMissionRightContent = this.sanitizer.bypassSecurityTrustHtml(parsedContent);
        }
        else if (res[i].id === 4) {
          const imageUrl = `${this.apiUrl}/${encodeURIComponent(extra_data.program_center_image)}`;
          let content = parsedContent.replace('{{image_placeholder}}', imageUrl);
          
          this.beingAGoodResidential = this.sanitizer.bypassSecurityTrustHtml(content);
        }
        else if (res[i].id === 5) {
          this.assistantInfo = this.sanitizer.bypassSecurityTrustHtml(parsedContent);
        }
        else if (res[i].id === 6) {
          let content = parsedContent;
          Object.keys(extra_data).forEach((key, i) => {
            const imageUrl = `${this.apiUrl}/${encodeURIComponent(extra_data[key])}`;
            content = content.replace(`{{${key}}}`, imageUrl);
          })
          this.whyChooseUsSection = this.sanitizer.bypassSecurityTrustHtml(content);
        }
        else if (res[i].id === 7) {
          let content = parsedContent;
          // const extra_data = res[i].extra_data;
          Object.keys(extra_data).forEach((key, i) => {
            const imageUrl = `${this.apiUrl}/${encodeURIComponent(extra_data[key])}`;
            content = content.replace(`{{${key}}}`, imageUrl);
          })
          this.whatMakesUsTheBest = this.sanitizer.bypassSecurityTrustHtml(content);
        }
        else if (res[i].id === 8) {
          let content = parsedContent;
          // const extra_data = res[i].extra_data;
          Object.keys(extra_data).forEach((key, i) => {
            const imageUrl = `${this.apiUrl}/${encodeURIComponent(extra_data[key])}`;
            content = content.replace(`{{${key}}}`, imageUrl);
          })
          this.howToOrder = this.sanitizer.bypassSecurityTrustHtml(content);
        }
        else if (res[i].id === 9) {
          this.qualityGuaranteed = this.sanitizer.bypassSecurityTrustHtml(parsedContent);
        }
        else if (res[i].id === 10) {
          let content = parsedContent;
          // const extra_data = res[i].extra_data;
          Object.keys(extra_data).forEach((key, i) => {
            const imageUrl = `${this.apiUrl}/${encodeURIComponent(extra_data[key])}`;
            content = content.replace(`{{${key}}}`, imageUrl);
          })
          // this.howToOrder = this.sanitizer.bypassSecurityTrustHtml(content);
          this.personalManagerToAssistYou = this.sanitizer.bypassSecurityTrustHtml(content);
        }
        else if (res[i].id === 11) {
          this.improvesYourGradeWithUs = this.sanitizer.bypassSecurityTrustHtml(parsedContent);
        }
      }
    });
    this.servicesService.getAllTopic().subscribe((res) => {
      this.topics = res;
      this.sortedTopics = res;
    });
    this.servicesService.getAllServices().subscribe(res => {
      console.log(res, "serviceType:home");
      this.serviceType = res;
    })
    this.servicesService.getAllAcademicLevels().subscribe(res => {
      console.log(res, "getAllAcademicLevels:home");
      this.academicLevels = res;
    });
    this.servicesService.getAllOrderPrices().subscribe(res => {
      this.orderPriceByDate = res;
    });

    setTimeout(() => {
      Aos.refreshHard();
    }, 0);
  }

  gotoOrderPage(){
    console.log("asncjancacnancjncjsajnsajcjcnsja:aaa");
    
    this.router.navigate(['/about']);
  }

  ngAfterViewInit(): void {
    this.observeSection();
    this.observeInnerElements();
  }

  observeSection() {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target); // Stop observing once it has become visible
        }
      });
    });

    const section = document.querySelector('.counter-section-2');
    if (section) {
      observer.observe(section);
    }
  }

  observeInnerElements() {
    const innerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          innerObserver.unobserve(entry.target); // Stop observing once it has become visible
        }
      });
    });

    const elements = document.querySelectorAll('.animate-item');
    elements.forEach(element => {
      innerObserver.observe(element);
    });
  }

  // Calc section
  sortTopics(letter: string) {
    this.sortedTopics = this.topics.filter(topic => topic.title.startsWith(letter));
  }

  clearTopic() {
    this.sortedTopics = [...this.topics];
    this.radioButtons.forEach((radioButton: any) => radioButton.nativeElement.checked = false);
  }

  checkPrice() {
    if (this.dissertationForm.invalid) {
      this.errorMessage = 'Please fill out all fields.';
      return;
    }

    this.errorMessage = '';

    const selectedService = this.dissertationForm.value.service;
    const selectedServiceType = this.dissertationForm.value.serviceType;
    const selectedAcademicLevel = this.dissertationForm.value.academicLevel;
    const selectedDeadline = this.dissertationForm.value.deadline;
    const numberOfPages = Number(this.dissertationForm.value.pages);

    const selectedTopic = this.sortedTopics.find(topic => topic.title === selectedService);
    const priceOfTopic = selectedTopic ? selectedTopic.price : 0;
    
    const selectedServiceTypeObj = this.serviceType.find(service => service.title === selectedServiceType);
    const priceOfService = selectedServiceTypeObj ? selectedServiceTypeObj.price : 0;

    const selectedAcadLevelObj = this.academicLevels.find(academic => academic.title === selectedAcademicLevel);
    const priceForAcadLevel = selectedAcadLevelObj ? selectedAcadLevelObj.price : 0;

    const diffInDays = getDiffInDays(selectedDeadline);

    const matchingOrderPrice = this.orderPriceByDate.find(priceRange => 
      diffInDays >= priceRange.min_day && diffInDays <= priceRange.max_day
    );

    console.log(matchingOrderPrice, "==matchingOrderPrice:home");
    
    let priceByDeadline = matchingOrderPrice ? Number(matchingOrderPrice.price): 0

    this.costPerPage = Number(priceOfTopic) + Number(priceForAcadLevel) + Number(priceOfService) + priceByDeadline;
    this.totalPrice = Math.round(this.costPerPage * numberOfPages);

    console.log(selectedDeadline, "==deadlineeeee, ", this.totalPrice);
    console.log(priceOfTopic, " = ", priceForAcadLevel, " = ", priceOfService, "==deadlineeeee");
  }
}











// import { Component, OnInit } from '@angular/core';
// import { ServicesService } from '../services/services.service';
// import * as Aos from 'aos';

// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   ngOnInit(): void {
//     Aos.init();
//   }
  
// }
