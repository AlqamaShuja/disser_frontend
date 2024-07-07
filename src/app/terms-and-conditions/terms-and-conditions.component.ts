import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditions implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Implement your initialization logic here
    // For example, you can access route parameters using this.route.snapshot.paramMap
  }
}
