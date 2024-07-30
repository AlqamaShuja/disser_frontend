import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  items = [
    { title: 'Accordion Item ', content: 'Content for accordion item .' },
    { title: 'Accordion Item ', content: 'Content for accordion item .' },
    { title: 'Accordion Item ', content: 'Content for accordion item .' }
  ];

  expandedIndex: number | null = null;

  toggle(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }
}
