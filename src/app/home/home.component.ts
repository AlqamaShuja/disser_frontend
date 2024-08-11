// import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import { Component, OnInit, AfterViewInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
// import { ServicesService } from '../services/services.service';
import { AcademicLevelData } from './home.model';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  topics: any[] = [];
  sortedTopics: any[] = [];
  selectedTopic: any;
  errorMessage: string = '';
  academicLevels: AcademicLevelData[] = [
    { title: 'Undergraduate', price: 5 }, 
    { title: 'Graduate', price: 10 }, 
    { title: 'PhD', price: 15 }
  ];
  serviceType: AcademicLevelData[] = [
    { title: 'Dissertation Full', price: 15 }, 
    { title: 'Dissertation Proposal', price: 30 }
  ];
  totalPrice: number = 0;
  costPerPage: number = 0;

  @ViewChildren('radioButton') radioButtons!: QueryList<any>;
  @ViewChild('dissertationForm', { static: true }) dissertationForm!: NgForm;

  constructor(private servicesService: ServicesService) { }
  // constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    Aos.init();
    this.servicesService.getAllTopic().subscribe((res) => {
      this.topics = res;
      this.sortedTopics = res;
    });
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
    const numberOfPages = this.dissertationForm.value.pages;

    const selectedTopic = this.sortedTopics.find(topic => topic.title === selectedService);
    const priceOfTopic = selectedTopic ? selectedTopic.price : 0;
    
    const selectedServiceTypeObj = this.serviceType.find(service => service.title === selectedServiceType);
    const priceOfService = selectedServiceTypeObj ? selectedServiceTypeObj.price : 0;

    const selectedAcadLevelObj = this.academicLevels.find(academic => academic.title === selectedAcademicLevel);
    const priceForAcadLevel = selectedAcadLevelObj ? selectedAcadLevelObj.price : 0;

    this.costPerPage = priceOfTopic + priceForAcadLevel + priceOfService;
    this.totalPrice = this.costPerPage * numberOfPages;

    console.log(selectedDeadline, "==deadlineeeee");
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
