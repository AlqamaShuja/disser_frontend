import { Component, Input, OnInit } from '@angular/core';
import * as Aos from 'aos';
import { ServicesService } from 'src/app/services/services.service';
import { BASEURL } from 'src/globals';

interface Slide {
  imageUrl: string;
  heading: string;
  text: string;
  showAboutUs: boolean;
}

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  @Input()
  aboutUs: boolean = false;

  slides: Slide[] = []; // Define the type of slides
  // BASE_URL: string = 'https://dissertationbackend.dissertationwriting.help/api/v1/'
  // BASEURL: string = 'http://localhost:3000/api/v1/'
  currentIndex: number = 0;

  constructor(private serviceService: ServicesService) {}

  ngOnInit(): void {
    Aos.init();

    // Automatically advance the slider every few seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);

    this.serviceService.getSectionDataById(12).subscribe((res) => {
      console.log(res, 'scmkacacackaskc:sliderData');
      this.slides = JSON.parse(res.description).map((sliderData: Slide) => ({ ...sliderData, imageUrl: `${BASEURL}files/${sliderData.imageUrl}` })) as Slide[];
    });
  }

  onStartConversation(): void {
    (window as any).activateChat();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }

  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1 + this.slides.length) % this.slides.length;
  }
}






























// import { Component, Input, OnInit } from '@angular/core';
// import * as Aos from 'aos';
// import { ServicesService } from 'src/app/services/services.service';

// @Component({
//   selector: 'app-slider',
//   templateUrl: './slider.component.html',
//   styleUrls: ['./slider.component.css'],
// })
// export class SliderComponent implements OnInit {
//   @Input()
//   aboutUs: boolean = false;

//   slides = []
//   // [
//   //   {
//   //     imageUrl: '../../../assets/banners/banner1.jpg',
//   //     heading: 'Welcome to Your Roadmap to Academic Excellence: The Leading Dissertation Writing Service in the UK',
//   //     text: "Initiating the dissertation process can seem overwhelming due to the requirements of thorough research, profound analysis, and meticulous writing. For students in the UK, our holistic services provide much-needed assistance on this demanding academic path. <br/>These services aim to support students throughout the dissertation process, offering comprehensive resources and expertise. From the initial stages of topic selection and research proposal development to the final stages of writing and editing, they offer a wealth of support to ensure students can navigate the complexities of their dissertations successfully.",
//   //     showAboutUs: false
//   //   },
//   //   {
//   //     imageUrl: 'banner2.jpg',
//   //     heading: 'Get to know Dissertation Writing',
//   //     text: 'Smart Edu Ltd have proven to be the best assignment writing service in the UK as we have helped over 15,000 clients with assignment advice and assistance. Because we turn your ideas into reality.',
//   //     showAboutUs: true
//   //   },
//   //   {
//   //     imageUrl: 'banner3.jpg',
//   //     heading: 'Achieve Your Academic Goals',
//   //     text: 'Our experienced team of writers and researchers are dedicated to helping you achieve your academic goals. From research papers to dissertations, we provide comprehensive support tailored to your needs.',
//   //     showAboutUs: false
//   //   },
//   //   {
//   //     imageUrl: 'banner4.jpg',
//   //     heading: 'Quality and Reliability',
//   //     text: 'We prioritize quality and reliability in all our services. Our team works tirelessly to ensure that you receive the best possible assistance, backed by our satisfaction guarantee.',
//   //     showAboutUs: false
//   //   },
//   //   {
//   //     imageUrl: 'banner5.jpg',
//   //     heading: '24/7 Customer Support',
//   //     text: 'Our customer support team is available around the clock to answer your questions and provide assistance whenever you need it. Your satisfaction is our top priority.',
//   //     showAboutUs: false
//   //   },
//   // ];

//   // FIrst slide prev data obj
//   // slides = [
//   //   {
//   //     imageUrl: 'banner1.jpg',
//   //     heading: 'Cutting Edge & Professional Academic Excellence',
//   //     text: 'Are you looking for top-notch assignment writing services? Partnering with Dissertation Writings UK means gaining access to a dynamic and innovative academic support system. We leverage cutting-edge technologies, research methodologies, and teaching strategies to ensure that our clients receive the most up-to-date and relevant assistance.',
//   //     showAboutUs: false
//   //   },
//   // ];

//   currentIndex: number = 0;

//   constructor(private serviceService: ServicesService){}

//   ngOnInit(): void {
//     Aos.init();
//     // Automatically advance the slider every few seconds
//     setInterval(() => {
//       this.nextSlide();
//     }, 5000);

//     this.serviceService.getSectionDataById(12).subscribe(res => {
//       console.log(res, "scmkacacackaskc:sliderData");
//       this.slides = JSON.parse(res.description);
//     })
//   }

//   onStartConversation(): void {
//     (window as any).activateChat();
//   }

//   nextSlide(): void {
//     this.currentIndex = (this.currentIndex + 1) % this.slides.length;
//   }
//   previousSlide(): void {
//     this.currentIndex = (this.currentIndex - 1) % this.slides.length;
//   }

// }