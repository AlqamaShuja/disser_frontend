import { Component } from '@angular/core';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.css']
})
export class TextPageComponent {
  addTextPage:boolean = false;

  onClickAddTextPage():void{
    this.addTextPage = !this.addTextPage;
  }
}
