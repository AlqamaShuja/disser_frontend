import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-assignment-categories',
  templateUrl: './assignment-categories.component.html',
  styleUrls: ['./assignment-categories.component.css']
})
export class AssignmentCategoriesComponent implements OnInit {

  categories: any[] = [];
  expandedIndex: number | null = null;

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.getAllCategories().subscribe((res) => {
      this.categories = res.data.map((category: any) => ({
        catogeryName: category.catogeryName,
        description: category.description || 'This is a dummy text as no description is available.'
      }));
    });
  }

  toggle(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }
}









// import { Component, OnInit } from '@angular/core';
// import { OrderService } from '../services/order.service';

// @Component({
//   selector: 'app-assignment-categories',
//   templateUrl: './assignment-categories.component.html',
//   styleUrls: ['./assignment-categories.component.css']
// })
// export class AssignmentCategoriesComponent implements OnInit {

//   categories: any[] = [];
//   expandedIndex: number | null = null;

//   constructor(private orderService: OrderService) { }

//   ngOnInit(): void {
//     this.orderService.getAllCategories().subscribe((res) => {
//       console.log(res.data, "=cat dataaaaaaaaa");
      
//       this.categories = res.data
//       // .map((category: any) => ({
//       //   name: category.catogeryName,
//       //   content: category.description ?? "No Description Available"
//       // }));
//     });
//   }

//   toggle(index: number): void {
//     this.expandedIndex = this.expandedIndex === index ? null : index;
//   }
// }