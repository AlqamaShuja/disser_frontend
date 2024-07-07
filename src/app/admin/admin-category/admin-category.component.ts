import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit{
  categories:any[] = [];
  selectedCategories:any;
  addCategories:boolean=false;
  categoryForm!:FormGroup;
  constructor(private orderService:OrderService,private formBuilder: FormBuilder){}
  ngOnInit(): void {
    this.orderService.getAllCategories().subscribe((res)=>{
      this.categories = res.data;
    })
  }
  showAddService(service?:any):void{
    this.selectedCategories = service;
    this.generateForm();
    this.addCategories = !this.addCategories;
  }

  submitForm(action:any):void{
    if(this.categoryForm.invalid){
      return;
    }
    if(action === 'add'){
    this.orderService.createCategory(this.categoryForm.value).subscribe((res:any)=>{
      if(res.data.insertId){
        this.addCategories = !this.addCategories;
        this.selectedCategories = null;
      }
    })}else{
      this.orderService.updateCategory(this.categoryForm.value,this.selectedCategories.Id).subscribe((res:any)=>{
        if(res.data.affectedRows){
          this.addCategories = !this.addCategories;
          this.selectedCategories = null;
        }
      })
    }
  }
  generateForm():void{
    this.categoryForm = this.formBuilder.group({
      catogeryName: [this.selectedCategories ? this.selectedCategories.catogeryName:'', Validators.required],
      mainId: [this.selectedCategories ? this.selectedCategories.mainId:'', [Validators.required]],
      price: [this.selectedCategories ? this.selectedCategories.price:'', Validators.required],
      categeryId: [this.selectedCategories ? this.selectedCategories.categeryId:'', Validators.required]
    });
  }
  deleteService(id:number):void{
    this.orderService.deleteCategory(id).subscribe(res => {
      console.log(res)
    })
  }
}
