import { Component, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-how-to-order-sect',
  templateUrl: './how-to-order-sect.component.html',
  styleUrls: ['./how-to-order-sect.component.css']
})
export class HowToOrderSectComponent implements OnChanges {
  @Input() howToOrder!: SafeHtml;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['howToOrder'] && changes['howToOrder'].currentValue) {
      this.initializeTabs();
    }
  }

  initializeTabs(): void {
    setTimeout(() => {
      const tabs = this.elRef.nativeElement.querySelectorAll('.tab');
      const tabContents = this.elRef.nativeElement.querySelectorAll('.tab-content');

      console.log(tabs, "====tabsssssssssssss, ", tabContents);
      

      if (tabs.length > 0) {
        tabs.forEach((tab: HTMLElement) => {
          this.renderer.listen(tab, 'click', () => {
            tabContents.forEach((content: HTMLElement) => {
              this.renderer.setStyle(content, 'display', 'none');
            });

            const targetContent = this.elRef.nativeElement.querySelector(`#${tab.getAttribute('data-tab')}`);
            if (targetContent) {
              this.renderer.setStyle(targetContent, 'display', 'block');
            }

            tabs.forEach((t: HTMLElement) => t.classList.remove('active'));
            tab.classList.add('active');
          });
        });

        // Activate the first tab by default
        tabs[0].click();
      }
    }, 0); // Delay to ensure DOM is fully updated
  }
}
