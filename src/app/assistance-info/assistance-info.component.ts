import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-assistance-info',
  templateUrl: './assistance-info.component.html',
  styleUrls: ['./assistance-info.component.css']
})
export class AssistanceInfoComponent implements OnInit, AfterViewInit {
  assistanceItems = [
    {
      title: 'Unique Topic Selection',
      description: 'Our expert team can guide you in selecting a relevant, unique, and impactful topic that aligns with your academic interests and future goals.',
      icon: `<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>`,
      bgColor: '#fdeacc',
    },
    {
      title: 'Thorough Research',
      description: 'Our writers excel at conducting in-depth research from credible sources, ensuring your dissertation is abundant with pertinent and current information.',
      icon: `<path d="M12 17.27L18.18 21 16.54 14.14 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 14.14 5.82 21z"/>`,
      bgColor: '#e9edf5',
    },
    {
      title: 'Precise Writing',
      description: 'A standout dissertation is one that is clearly and accurately written. Our writers have the talent to communicate complex ideas engagingly and understandably.',
      icon: `<path d="M12 2L1 9l11 7 9-5.98V19H8v2h16V9L12 2zm0 13L4.33 9 12 4.33 19.67 9 12 15z"/>`,
      bgColor: '#eaf6e9',
    },
    {
      title: 'Detailed Analysis',
      description: 'Our team is trained to conduct a comprehensive analysis, interpreting the research findings in the context of existing theories and concepts.',
      icon: `<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM9.5 11H7v2h2.5l1.5 3h2.5l1.5-3H17v-2h-2.5L13 8H9.5l-1.5 3z"/>`,
      bgColor: '#fdeacc'
    },
    {
      title: 'Editing and Proofreading',
      description: 'Small errors can leave a big impact. Our professional editors ensure your dissertation is free from errors and formatted consistently.',
      icon: `<path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>`,
      bgColor: '#fdeacc',
    },
    {
      title: 'Compliance with Academic Standards',
      description: 'Our team is familiar with various academic citation styles and dissertation structures required by UK universities. We ensure your dissertation meets these standards, enhancing its academic value.',
      icon: `<path d="M12 17.27L18.18 21 16.54 14.14 22 9.24 14.81 8.63 12 2 9.19 8.63 2 9.24 7.46 14.14 5.82 21z"/>`,
      bgColor: '#e9edf5',
    }
  ];

  ngOnInit(): void {
    AOS.init();
  }

  ngAfterViewInit(): void {
    AOS.refresh();
  }
}
