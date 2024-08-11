import { Component } from '@angular/core';

@Component({
  selector: 'app-whatmakesusbest-sect',
  templateUrl: './whatmakesusbest-sect.component.html',
  styleUrls: ['./whatmakesusbest-sect.component.css']
})

export class WhatmakesusbestSectComponent {
  makeUsBest1 = [
    {
      title: 'Unparalleled Expertise',
      description: 'Our team comprises experts from diverse fields holding advanced degrees. Their knowledge and expertise vouch for the quality of our service.'
    },
    {
      title: 'Personalized Service',
      description: 'Each dissertation project is unique. We adopt a personalized approach, considering your specific needs, preferences, and university guidelines.'
    },
    {
      title: 'Timely Delivery',
      description: 'We understand the importance of deadlines and their associated stress. Our writers work diligently to deliver your dissertation on time without compromising on quality.'
    },
    {
      title: 'Exceptional Customer Service',
      description: 'Our commitment extends beyond delivering a well-written dissertation. We offer exceptional customer service, promptly resolving your queries and concerns.'
    }
  ];

  makeUsBest2 = [
    {
      title: 'Transparent Pricing',
      description: "We believe in fair and transparent pricing. You'll know upfront what our services will cost, with no hidden charges.",
    },
    {
      title: '24/7 Support',
      description: 'Our commitment to your academic accomplishment transcends beyond the delivery of the dissertation. Our support team is available round the clock for any inquiries or assistance you may need.',
    },
    {
      title: 'Advanced Plagiarism Detection',
      description: 'We utilize advanced plagiarism detection software. The software scans every line and reference of your dissertation. Its purpose is to verify the originality of your work.',
    },
  ]  
}

