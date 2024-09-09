import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-giveaways',
  templateUrl: './giveaways.component.html',
  styleUrls: ['./giveaways.component.css']
})
export class GiveawaysComponent {
  constructor(private router: Router){}

  handleNavigate(path: string){
    this.router.navigate([path])
  }
}
