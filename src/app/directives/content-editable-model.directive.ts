import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[contentEditableModel]'
})
export class ContentEditableModelDirective {
  @Output() contentChange = new EventEmitter<string>();

  constructor(private el: ElementRef) {}

  @HostListener('input') onInput(): void {
    const html = this.el.nativeElement.innerHTML;
    this.contentChange.emit(html);
  }
}
