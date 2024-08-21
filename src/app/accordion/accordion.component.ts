import { Component, Input } from '@angular/core';

interface AccordionData {
  title: string,
  content: string,
}

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent {
  @Input() items!: AccordionData[]
  // [
  //   { title: 'Accordion Item ', content: 'Content for accordion item .' },
  //   { title: 'Accordion Item ', content: 'Content for accordion item .' },
  //   { title: 'Accordion Item ', content: 'Content for accordion item .' }
  // ];

  expandedIndex: number | null = null;

  toggle(index: number) {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isExpanded(index: number): boolean {
    return this.expandedIndex === index;
  }
}
