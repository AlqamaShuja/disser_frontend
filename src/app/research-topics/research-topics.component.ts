import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services/services.service';
import { AcademicLevelData } from './topic.model';



@Component({
  selector: 'app-research-topics',
  templateUrl: './research-topics.component.html',
  styleUrls: ['./research-topics.component.css']
})
export class ResearchTopicsComponent implements OnInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  topics: any[] = [];
  sortedTopics: any[] = [];
  selectedTopic: any;
  errorMessage: string = '';
  academicLevels: AcademicLevelData[] = [
    { title: 'Undergraduate', price: 5, }, 
    { title: 'Graduate', price: 10, }, 
    { title: 'PhD', price: 15, }, 
  ];
  serviceType: AcademicLevelData[] = [
    { title: 'Dissertation Full', price: 15, }, 
    { title: 'Dissertation Proposal', price: 30, }, 
  ];
  totalPrice: number = 0

  @ViewChildren('radioButton') radioButtons!: QueryList<any>;
  @ViewChild('dissertationForm', { static: true }) dissertationForm!: NgForm;

  constructor(private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.serviceService.getAllTopic().subscribe((res) => {
      // console.log(res, "====res.data:topiccss");
      this.topics = res;
      this.sortedTopics = res;
    });
  }

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

    const selectedTopic = this.sortedTopics.find(topic => topic.title === selectedService);
    const priceOfTopic = selectedTopic ? selectedTopic.price : 0;
    
    const selectedservice = this.serviceType.find(service => service.title === selectedServiceType);
    const priceOfService = selectedservice ? selectedservice.price : 0;

    const selectedAcadLevelObj = this.academicLevels.find(topic => topic.title === selectedAcademicLevel);
    const priceForAcadLevel = selectedAcadLevelObj ? selectedAcadLevelObj.price : 0;

    this.totalPrice = Number(priceOfTopic) + Number(priceForAcadLevel) + Number(priceOfService);

    console.log(selectedDeadline, "==deadlineeeee");
    console.log(priceOfTopic, " = ", priceForAcadLevel, " = ", priceOfService, "==deadlineeeee");
    
  }
}

















// import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';
// import { ServicesService } from '../services/services.service';

// @Component({
//   selector: 'app-research-topics',
//   templateUrl: './research-topics.component.html',
//   styleUrls: ['./research-topics.component.css']
// })
// export class ResearchTopicsComponent implements OnInit {
//   alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//   topics: string[] = []
//   // [
//   //   'AI & Machine Learning', 'Blockchain & Cryptocurrency', 'Biotech & Genetic Engineering',
//   //   'Business & Management', 'Communication', 'Computer Science & IT', 'Cybersecurity',
//   //   'Data Science & Analytics', 'Healthcare', 'Journalism', 'Marketing & Advertising',
//   //   'Mental Health & Wellbeing', 'Neuroscience', 'Nursing', 'Political Science',
//   //   'Public Health & Epidemiology'
//   // ];
//   sortedTopics: string[] = [];

//   @ViewChildren('radioButton') radioButtons!: QueryList<any>;
//   constructor(private serviceService: ServicesService) { }

//   // ngOnInit() {
//   //   this.sortedTopics = [...this.topics];
//   // }

//   ngOnInit(): void {
//     this.serviceService.getAllTopic().subscribe((res) => {
//       console.log(res, "====res.data:topiccss");
//       this.topics = res;
//       this.sortTopics = res;
//     });
//   }

//   sortTopics(letter: string) {
//     this.sortedTopics = this.topics.filter(topic => topic.startsWith(letter));
//   }

//   clearTopic() {
//     this.sortedTopics = [...this.topics];
//     this.radioButtons.forEach((radioButton: any) => radioButton.nativeElement.checked = false);
//   }
// }







































// import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

// @Component({
//   selector: 'app-research-topics',
//   templateUrl: './research-topics.component.html',
//   styleUrls: ['./research-topics.component.css']
// })
// export class ResearchTopicsComponent implements OnInit {
//   alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
//   topics: string[] = [
//     'AI & Machine Learning', 'Blockchain & Cryptocurrency', 'Biotech & Genetic Engineering',
//     'Business & Management', 'Communication', 'Computer Science & IT', 'Cybersecurity',
//     'Data Science & Analytics', 'Healthcare', 'Journalism', 'Marketing & Advertising',
//     'Mental Health & Wellbeing', 'Neuroscience', 'Nursing', 'Political Science', 
//     'Public Health & Epidemiology'
//   ];
//   sortedTopics: string[] = [];

//   @ViewChildren('radioButton') radioButtons!: QueryList<any>;

//   ngOnInit() {
//     this.sortedTopics = [...this.topics];
//   }

//   sortTopics(letter: string) {
//     this.sortedTopics = this.topics.filter(topic => topic.startsWith(letter));
//   }

//   clearTopic() {
//     this.sortedTopics = [...this.topics];
//     this.radioButtons.forEach((radioButton: any) => radioButton.nativeElement.checked = false);
//   }
// }
