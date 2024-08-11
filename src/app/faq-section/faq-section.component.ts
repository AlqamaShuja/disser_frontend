import { Component } from '@angular/core';

interface FAQ {
  title: string;
  content: string;
  isOpen: boolean;
}

@Component({
  selector: 'app-faq-section',
  templateUrl: './faq-section.component.html',
  styleUrls: ['./faq-section.component.css']
})
export class FaqSectionComponent {
  faqs: FAQ[] = [
    {
      title: 'Services Designed for Masters and Ph.D. Students',
      content: `Our dissertation writing services in the UK are carefully designed to cater to the diverse needs of students across a spectrum of academic levels. Whether you're standing at the precipice of your first major academic research project in a Master's degree or delving deeper into a specific field as part of a Ph.D. program, we have resources and professionals on hand to guide and support you through your journey.
      For Master's degree students, our writers provide the following:
      Valuable insights into formulating a well-defined research question.
      Conducting a comprehensive literature review.
      Presenting a compelling argument backed by relevant research.
      Our writers comprehensively understand the academic standards and guidelines at each level, ensuring your work adheres to the requirements. They work with you, offering constant guidance and support and helping craft a document that meets academic standards and aligns with your personal voice and vision.`,
      isOpen: false
    },
    {
      title: 'Easily Accessible Online Services',
      content: `We are proud to announce that our range of services is available online, eliminating geographical boundaries and time constraints. We're right there with you, providing the support and solutions you need at your fingertips, regardless of your location. Furthermore, conventional working hours do not restrict our dissertation writing help in the UK. Whether it's day or night, weekday or weekend, you can rely on our platform to be there for you. In today's fast-paced world, we understand that you might require our services outside of traditional office hours, and we are committed to ensuring that our services are at your disposal around the clock.`,
      isOpen: false
    }
  ];

  toggleAccordion(faq: FAQ): void {
    faq.isOpen = !faq.isOpen;
  }
}
