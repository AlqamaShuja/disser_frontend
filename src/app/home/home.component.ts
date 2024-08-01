import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ServicesService } from '../services/services.service';
import * as Aos from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    Aos.init();
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
