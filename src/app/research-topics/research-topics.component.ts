import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServicesService } from '../services/services.service';
import { AcademicLevelData } from './topic.model';
import { BASEURL, getDiffInDays } from 'src/globals';
import { Router } from '@angular/router';

@Component({
  selector: 'app-research-topics',
  templateUrl: './research-topics.component.html',
  styleUrls: ['./research-topics.component.css']
})
export class ResearchTopicsComponent implements OnInit {
  alphabet: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  topics: any[] = [];
  sortedTopics: any[] = [];
  orderPriceByDate: any[] = [];
  selectedTopic: any;
  errorMessage: string = '';
  expandedIndex: number | null = null;
  slides: any = {};

  academicLevels: AcademicLevelData[] = []
  // [
  //   { title: 'Undergraduate', price: 5, },
  //   { title: 'Graduate', price: 10, },
  //   { title: 'PhD', price: 15, },
  // ];

  serviceType: AcademicLevelData[] = []
  // [
  //   { title: 'Dissertation Full', price: 15, },
  //   { title: 'Dissertation Proposal', price: 30, },
  // ];

  totalPrice: number = 0;

  @ViewChildren('radioButton') radioButtons!: QueryList<any>;
  @ViewChild('dissertationForm', { static: true }) dissertationForm!: NgForm;

  constructor(private serviceService: ServicesService, private router: Router) { }

  ngOnInit(): void {
    this.serviceService.getSectionDataById(16).subscribe((res) => {
      this.slides = JSON.parse(res.description).map((sliderData: any) => ({ ...sliderData, imageUrl: `${BASEURL}files/${sliderData.imageUrl}` }))[0];
      console.log(this.slides, 'sli:scmkacacackaskc:sliderData');
    });

    this.serviceService.getAllTopic().subscribe((res) => {
      this.topics = res;
      this.sortedTopics = res;
    });
    this.serviceService.getAllAcademicLevels().subscribe(res => {
      this.academicLevels = res;
    });
    this.serviceService.getAllServices().subscribe(res => {
      this.serviceType = res;
    });
    this.serviceService.getAllOrderPrices().subscribe(res => {
      this.orderPriceByDate = res;
    });
  }

  sortTopics(letter: string) {
    this.sortedTopics = this.topics.filter(topic => topic.title?.toLowerCase()?.startsWith(letter?.toLowerCase()));
    this.expandedIndex = null;
  }

  clearTopic() {
    this.sortedTopics = [...this.topics];
    this.radioButtons.forEach((radioButton: any) => radioButton.nativeElement.checked = false);
  }

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
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

    // get diff in days
    const diffInDays = getDiffInDays(selectedDeadline);

    const matchingOrderPrice = this.orderPriceByDate.find(priceRange =>
      diffInDays >= priceRange.min_day && diffInDays <= priceRange.max_day
    );


    let priceByDeadline = matchingOrderPrice ? Number(matchingOrderPrice.price): 0
    console.log({ diffInDays, matchingOrderPrice, priceOfTopic, priceForAcadLevel, priceOfService, });

    this.totalPrice = Math.floor(Number(priceOfTopic) + Number(priceForAcadLevel) + Number(priceOfService) + priceByDeadline);
  }

  navigateToOrder(){
    this.router.navigate(["/order"])
  }
}
