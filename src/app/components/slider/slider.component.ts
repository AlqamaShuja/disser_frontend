import { Component, Input, OnInit } from '@angular/core';
import * as Aos from 'aos';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit {
  @Input()
  aboutUs: boolean = false;

  slides = [
    {
      imageUrl: '../../../assets/banners/banner1.jpg',
      heading: 'Cutting Edge & Professional Academic Excellence',
      text: 'Are you looking for top-notch assignment writing services? Partnering with Dissertation Writings UK means gaining access to a dynamic and innovative academic support system. We leverage cutting-edge technologies, research methodologies, and teaching strategies to ensure that our clients receive the most up-to-date and relevant assistance.',
      showAboutUs: false
    },
    {
      imageUrl: '../../../assets/banners/banner2.jpg',
      heading: 'Get to know Dissertation Writing',
      text: 'Smart Edu Ltd have proven to be the best assignment writing service in the UK as we have helped over 15,000 clients with assignment advice and assistance. Because we turn your ideas into reality.',
      showAboutUs: true
    },
    {
      imageUrl: '../../../assets/banners/banner3.jpg',
      heading: 'Achieve Your Academic Goals',
      text: 'Our experienced team of writers and researchers are dedicated to helping you achieve your academic goals. From research papers to dissertations, we provide comprehensive support tailored to your needs.',
      showAboutUs: false
    },
    {
      imageUrl: '../../../assets/banners/banner4.jpg',
      heading: 'Quality and Reliability',
      text: 'We prioritize quality and reliability in all our services. Our team works tirelessly to ensure that you receive the best possible assistance, backed by our satisfaction guarantee.',
      showAboutUs: false
    },
    {
      imageUrl: '../../../assets/banners/banner5.jpg',
      heading: '24/7 Customer Support',
      text: 'Our customer support team is available around the clock to answer your questions and provide assistance whenever you need it. Your satisfaction is our top priority.',
      showAboutUs: false
    },
  ];

  currentIndex: number = 0;

  ngOnInit(): void {
    Aos.init();
    // Automatically advance the slider every few seconds
    setInterval(() => {
      this.nextSlide();
    }, 5000);
  }

  onStartConversation(): void {
    (window as any).activateChat();
  }

  nextSlide(): void {
    this.currentIndex = (this.currentIndex + 1) % this.slides.length;
  }
  previousSlide(): void {
    this.currentIndex = (this.currentIndex - 1) % this.slides.length;
  }

}