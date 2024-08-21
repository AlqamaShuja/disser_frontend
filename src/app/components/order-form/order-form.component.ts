import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { ServicesService } from 'src/app/services/services.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  @Input() categories: any;
  @Output() orderEvent = new EventEmitter();
  orderForm: FormGroup;
  gbpTotalCost: number = 0;
  topics: any[] = [];
  academicLevel: any[] = [];

  typeOfServices: Array<{ title: string, price: string, id: number, }> = []
  // [
  //   { title: 'Dissertation Writing', price: 50 },
  //   { title: 'Research Proposal Writing', price: 40 },
  //   { title: 'Dissertation Proofreading & Editing', price: 30 }
  // ];

  subjectAreas: Array<{ title: string, price: number, id: number }> = []
  // [
  //   { title: 'Business', price: 10 },
  //   { title: 'Engineering', price: 15 },
  //   { title: 'Law', price: 20 },
  //   { title: 'Medicine', price: 25 },
  //   { title: 'Science', price: 12 },
  //   { title: 'Arts', price: 8 }
  // ];

  desiredGrades: Array<{ title: string, price: number }> = [
    { title: '1st Class Standard (80%+)', price: 70 },
    { title: '2:1 Standard (70%+)', price: 60 },
    { title: '2:2 Standard (50%-60%+)', price: 50 }
  ];

  deadlines: Array<{ title: string, price: number }> = [
    { title: '48 Hours Urgent Delivery', price: 100 },
    { title: '3 Days Urgent Delivery', price: 80 },
    { title: '5 Days Delivery', price: 60 },
    { title: '10 Days Delivery', price: 40 },
    { title: '15 Days Delivery', price: 20 },
    { title: '25 Days Delivery', price: 10 },
    { title: '30 Days Delivery', price: 5 }
  ];

  referencingStyles: Array<{ title: string, price: number }> = [
    { title: 'Harvard', price: 0 },
    { title: 'APA', price: 0 },
    { title: 'MLA', price: 0 },
    { title: 'OSCOLA', price: 0 },
    { title: 'Oxford', price: 0 },
    { title: 'Other', price: 0 }
  ];

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private serviceService: ServicesService,
    private toastr: ToastrService
  ) {
    this.orderForm = this.formBuilder.group({
      typeOfService: ['', Validators.required],
      subjectArea: ['', Validators.required],
      level: ['', Validators.required],
      requiredWordCount: ['', Validators.required],
      desiredGrade: ['', Validators.required],
      deadline: ['', Validators.required],
      topic: ['', Validators.required],
      detailInstructions: ['', Validators.required],
      referencingStyle: ['', Validators.required],
      numberOfReferences: ['', Validators.required],
      totalPrice: [{ value: '', disabled: true }, Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contactNumber: ['', Validators.required],
      universityName: ['', Validators.required],
      turnitin: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.serviceService.getAllTopic().subscribe((res) => {
      this.topics = res;
    });
    this.serviceService.getAllServices().subscribe((res) => {
      this.typeOfServices = res;
    });
    this.serviceService.getAllSubjectAreas().subscribe((res) => {
      this.subjectAreas = res;
    });
    this.serviceService.getAllAcademicLevels().subscribe((res) => {
      this.academicLevel = res;
    });
  }

  calculateTotalPrice(): void {
    const typeOfServicePrice = this.typeOfServices.find(item => item.title === this.orderForm.value.typeOfService)?.price || 0;
    const subjectAreaPrice = this.subjectAreas.find(item => item.title === this.orderForm.value.subjectArea)?.price || 0;
    const academicLevelPrice = this.academicLevel.find(item => item.title === this.orderForm.value.desiredGrade)?.price || 0;
    const desiredGradePrice = this.desiredGrades.find(item => item.title === this.orderForm.value.desiredGrade)?.price || 0;
    const deadlinePrice = this.deadlines.find(item => item.title === this.orderForm.value.deadline)?.price || 0;
    const wordCount = this.orderForm.value.requiredWordCount || 0;
  
    const perPageWordCount = 1200;
    this.gbpTotalCost = Math.round((Number(typeOfServicePrice) + Number(subjectAreaPrice) + Number(academicLevelPrice) + desiredGradePrice + deadlinePrice) * wordCount / perPageWordCount);
  
    this.orderForm.patchValue({ totalPrice: this.gbpTotalCost });
  }

  onSubmit(): void {
    if (this.orderForm.invalid) {
      // Mark all controls as touched to trigger validation messages
      this.orderForm.markAllAsTouched();
  
      // Handle form validation errors
      Object.keys(this.orderForm.controls).forEach(field => {
        const control = this.orderForm.get(field);
        if (control && control.invalid) {
          // const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
          // this.toastr.error(`Please correct the ${fieldName} field`, 'Form Invalid');
        }
      });
      return;
    }
  
    const orderPayload = {
      Name: this.orderForm.value.email.split("@")[0],
      Email: this.orderForm.value.email,
      Phone: this.orderForm.value.contactNumber,
      WordsORPages: 'words',
      NumberOfWordsPages: this.orderForm.value.requiredWordCount,
      Topic: this.orderForm.value.topic,
      DetailInstructions: this.orderForm.value.detailInstructions,
      TypeofHelpRequire: this.orderForm.value.typeOfService,
      LineSpacing: 2, // Assuming a default value for now
      SoftwareService: 'N/A', // Assuming a default value for now
      TopicCategory: this.orderForm.value.subjectArea,
      PresentationSlides: 0, // Assuming a default value for now
      SourceReferences: this.orderForm.value.numberOfReferences,
      WritingStyle: this.orderForm.value.referencingStyle,
      PreferredLanguageLevel: 'English', // Assuming a default value for now
      EducationLevel: this.orderForm.value.level,
      PaperStandard: this.orderForm.value.desiredGrade,
      DeadLine: this.orderForm.value.deadline,
      BeforeDiscount: 0,
      DiscountCode: '',
      // GrossAmount: this.orderForm.value.totalPrice,
      GrossAmount: this.gbpTotalCost,
      Status: 'New',
      PaidStatus: 'Unpaid',
      suportingDoc: '',
      isSample: false
    };
  
    console.log(orderPayload, "===orderPayloadorderPayload");
  
    this.orderEvent.emit(orderPayload); // Emit the event on success
    // this.orderService.createOrder(orderPayload).subscribe(
    //   response => {
    //     // this.toastr.success('Order created successfully', 'Success');
    //     this.orderEvent.emit(orderPayload); // Emit the event on success
    //   },
    //   error => {
    //     // this.toastr.error('Error creating order', 'Error');
    //     alert('Error creating order');
    //   }
    // );
  }

  resetForm(): void {
    this.orderForm.reset(); // Reset the form fields
    this.gbpTotalCost = 0; // Reset the total cost
  }
}













// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { OrderService } from 'src/app/services/order.service';
// import { ServicesService } from 'src/app/services/services.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-order-form',
//   templateUrl: './order-form.component.html',
//   styleUrls: ['./order-form.component.css'],
// })
// export class OrderFormComponent implements OnInit {
//   @Input() categories: any;
//   orderForm: FormGroup;
//   gbpTotalCost: number = 0;
//   topics: any[] = [];

//   typeOfServices: Array<{ title: string, price: number }> = [
//     { title: 'Dissertation Writing', price: 50 },
//     { title: 'Research Proposal Writing', price: 40 },
//     { title: 'Dissertation Proofreading & Editing', price: 30 }
//   ];

//   subjectAreas: Array<{ title: string, price: number }> = [
//     { title: 'Business', price: 10 },
//     { title: 'Engineering', price: 15 },
//     { title: 'Law', price: 20 },
//     { title: 'Medicine', price: 25 },
//     { title: 'Science', price: 12 },
//     { title: 'Arts', price: 8 }
//   ];

//   desiredGrades: Array<{ title: string, price: number }> = [
//     { title: '1st Class Standard (80%+)', price: 70 },
//     { title: '2:1 Standard (70%+)', price: 60 },
//     { title: '2:2 Standard (50%-60%+)', price: 50 }
//   ];

//   deadlines: Array<{ title: string, price: number }> = [
//     { title: '48 Hours Urgent Delivery', price: 100 },
//     { title: '3 Days Urgent Delivery', price: 80 },
//     { title: '5 Days Delivery', price: 60 },
//     { title: '10 Days Delivery', price: 40 },
//     { title: '15 Days Delivery', price: 20 },
//     { title: '25 Days Delivery', price: 10 },
//     { title: '30 Days Delivery', price: 5 }
//   ];

//   referencingStyles: Array<{ title: string, price: number }> = [
//     { title: 'Harvard', price: 0 },
//     { title: 'APA', price: 0 },
//     { title: 'MLA', price: 0 },
//     { title: 'OSCOLA', price: 0 },
//     { title: 'Oxford', price: 0 },
//     { title: 'Other', price: 0 }
//   ];

//   @Output() orderEvent = new EventEmitter();

//   constructor(
//     private formBuilder: FormBuilder,
//     private orderService: OrderService,
//     private serviceService: ServicesService,
//     private toastr: ToastrService
//   ) {
//     this.orderForm = this.formBuilder.group({
//       typeOfService: ['', Validators.required],
//       subjectArea: ['', Validators.required],
//       level: ['', Validators.required],
//       requiredWordCount: ['', Validators.required],
//       desiredGrade: ['', Validators.required],
//       deadline: ['', Validators.required],
//       topic: ['', Validators.required],
//       detailInstructions: ['', Validators.required],
//       referencingStyle: ['', Validators.required],
//       numberOfReferences: ['', Validators.required],
//       totalPrice: [{ value: '', disabled: true }, Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       contactNumber: ['', Validators.required],
//       universityName: ['', Validators.required],
//       turnitin: ['', Validators.required],
//     });
//   }

//   ngOnInit(): void {
//     this.serviceService.getAllTopic().subscribe((res) => {
//       this.topics = res;
//     });
//   }

//   calculateTotalPrice(): void {
//     const typeOfServicePrice = this.typeOfServices.find(item => item.title === this.orderForm.value.typeOfService)?.price || 0;
//     const subjectAreaPrice = this.subjectAreas.find(item => item.title === this.orderForm.value.subjectArea)?.price || 0;
//     const desiredGradePrice = this.desiredGrades.find(item => item.title === this.orderForm.value.desiredGrade)?.price || 0;
//     const deadlinePrice = this.deadlines.find(item => item.title === this.orderForm.value.deadline)?.price || 0;
//     const wordCount = this.orderForm.value.requiredWordCount || 0;
  
//     const perPageWordCount = 1200;
//     this.gbpTotalCost = Math.round((typeOfServicePrice + subjectAreaPrice + desiredGradePrice + deadlinePrice) * wordCount / perPageWordCount);
  
//     this.orderForm.patchValue({ totalPrice: this.gbpTotalCost });
//   }

//   // onSubmit(): void {
//   //   if (this.orderForm.invalid) {
//   //     // Handle form validation errors
//   //     Object.keys(this.orderForm.controls).forEach(field => {
//   //       const control = this.orderForm.get(field);
//   //       if (control && control.invalid) {
//   //         const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
//   //         this.toastr.error(`Please correct the ${fieldName} field`, 'Form Invalid');
//   //       }
//   //     });
//   //     return;
//   //   }

//   //   const orderPayload = {
//   //     Name: this.orderForm.value.email.split("@")[0],
//   //     Email: this.orderForm.value.email,
//   //     Phone: this.orderForm.value.contactNumber,
//   //     WordsORPages: 'words',
//   //     NumberOfWordsPages: this.orderForm.value.requiredWordCount,
//   //     Topic: this.orderForm.value.topic,
//   //     DetailInstructions: this.orderForm.value.detailInstructions,
//   //     TypeofHelpRequire: this.orderForm.value.typeOfService,
//   //     LineSpacing: 2, // Assuming a default value for now
//   //     SoftwareService: 'N/A', // Assuming a default value for now
//   //     TopicCategory: this.orderForm.value.subjectArea,
//   //     PresentationSlides: 0, // Assuming a default value for now
//   //     SourceReferences: this.orderForm.value.numberOfReferences,
//   //     WritingStyle: this.orderForm.value.referencingStyle,
//   //     PreferredLanguageLevel: 'English', // Assuming a default value for now
//   //     EducationLevel: this.orderForm.value.level,
//   //     PaperStandard: this.orderForm.value.desiredGrade,
//   //     DeadLine: this.orderForm.value.deadline,
//   //     BeforeDiscount: 0,
//   //     DiscountCode: '',
//   //     GrossAmount: this.orderForm.value.totalPrice,
//   //     Status: 'New',
//   //     PaidStatus: 'Unpaid',
//   //     suportingDoc: '',
//   //     isSample: false
//   //   };

//   //   console.log(orderPayload, "===orderPayloadorderPayload");
    
//   //   this.orderService.createOrder(orderPayload).subscribe(
//   //     response => {
//   //       this.toastr.success('Order created successfully', 'Success');
//   //       this.orderEvent.emit(orderPayload); // Emit the event on success
//   //     },
//   //     error => {
//   //       this.toastr.error('Error creating order', 'Error');
//   //     }
//   //   );
//   // }

//   onSubmit(): void {
//     if (this.orderForm.invalid) {
//       // Mark all controls as touched to trigger validation messages
//       this.orderForm.markAllAsTouched();
  
//       // Handle form validation errors
//       Object.keys(this.orderForm.controls).forEach(field => {
//         const control = this.orderForm.get(field);
//         if (control && control.invalid) {
//           const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
//           this.toastr.error(`Please correct the ${fieldName} field`, 'Form Invalid');
//         }
//       });
//       return;
//     }
  
//     const orderPayload = {
//       Name: this.orderForm.value.email.split("@")[0],
//       Email: this.orderForm.value.email,
//       Phone: this.orderForm.value.contactNumber,
//       WordsORPages: 'words',
//       NumberOfWordsPages: this.orderForm.value.requiredWordCount,
//       Topic: this.orderForm.value.topic,
//       DetailInstructions: this.orderForm.value.detailInstructions,
//       TypeofHelpRequire: this.orderForm.value.typeOfService,
//       LineSpacing: 2, // Assuming a default value for now
//       SoftwareService: 'N/A', // Assuming a default value for now
//       TopicCategory: this.orderForm.value.subjectArea,
//       PresentationSlides: 0, // Assuming a default value for now
//       SourceReferences: this.orderForm.value.numberOfReferences,
//       WritingStyle: this.orderForm.value.referencingStyle,
//       PreferredLanguageLevel: 'English', // Assuming a default value for now
//       EducationLevel: this.orderForm.value.level,
//       PaperStandard: this.orderForm.value.desiredGrade,
//       DeadLine: this.orderForm.value.deadline,
//       BeforeDiscount: 0,
//       DiscountCode: '',
//       GrossAmount: this.orderForm.value.totalPrice,
//       Status: 'New',
//       PaidStatus: 'Unpaid',
//       suportingDoc: '',
//       isSample: false
//     };
  
//     console.log(orderPayload, "===orderPayloadorderPayload");
  
//     this.orderService.createOrder(orderPayload).subscribe(
//       response => {
//         this.toastr.success('Order created successfully', 'Success');
//         this.orderEvent.emit(orderPayload); // Emit the event on success
//       },
//       error => {
//         this.toastr.error('Error creating order', 'Error');
//       }
//     );
//   }
// }






























// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { OrderService } from 'src/app/services/order.service';
// import { ServicesService } from 'src/app/services/services.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-order-form',
//   templateUrl: './order-form.component.html',
//   styleUrls: ['./order-form.component.css'],
// })
// export class OrderFormComponent implements OnInit {
//   @Input() categories: any;
//   orderForm: FormGroup;
//   gbpTotalCost: number = 0;
//   topics: any[] = [];

//   typeOfServices: Array<{ title: string, price: number }> = [
//     { title: 'Dissertation Writing', price: 50 },
//     { title: 'Research Proposal Writing', price: 40 },
//     { title: 'Dissertation Proofreading & Editing', price: 30 }
//   ];

//   subjectAreas: Array<{ title: string, price: number }> = [
//     { title: 'Business', price: 10 },
//     { title: 'Engineering', price: 15 },
//     { title: 'Law', price: 20 },
//     { title: 'Medicine', price: 25 },
//     { title: 'Science', price: 12 },
//     { title: 'Arts', price: 8 }
//   ];

//   desiredGrades: Array<{ title: string, price: number }> = [
//     { title: '1st Class Standard (80%+)', price: 70 },
//     { title: '2:1 Standard (70%+)', price: 60 },
//     { title: '2:2 Standard (50%-60%+)', price: 50 }
//   ];

//   deadlines: Array<{ title: string, price: number }> = [
//     { title: '48 Hours Urgent Delivery', price: 100 },
//     { title: '3 Days Urgent Delivery', price: 80 },
//     { title: '5 Days Delivery', price: 60 },
//     { title: '10 Days Delivery', price: 40 },
//     { title: '15 Days Delivery', price: 20 },
//     { title: '25 Days Delivery', price: 10 },
//     { title: '30 Days Delivery', price: 5 }
//   ];

//   referencingStyles: Array<{ title: string, price: number }> = [
//     { title: 'Harvard', price: 0 },
//     { title: 'APA', price: 0 },
//     { title: 'MLA', price: 0 },
//     { title: 'OSCOLA', price: 0 },
//     { title: 'Oxford', price: 0 },
//     { title: 'Other', price: 0 }
//   ];

//   @Output() orderEvent = new EventEmitter();

//   constructor(
//     private formBuilder: FormBuilder,
//     private orderService: OrderService,
//     private serviceService: ServicesService,
//     private toastr: ToastrService
//   ) {
//     this.orderForm = this.formBuilder.group({
//       typeOfService: ['', Validators.required],
//       subjectArea: ['', Validators.required],
//       level: ['', Validators.required],
//       requiredWordCount: ['', Validators.required],
//       desiredGrade: ['', Validators.required],
//       deadline: ['', Validators.required],
//       topic: ['', Validators.required],
//       detailInstructions: ['', Validators.required],
//       referencingStyle: ['', Validators.required],
//       numberOfReferences: ['', Validators.required],
//       totalPrice: [{ value: '', disabled: true }, Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       contactNumber: ['', Validators.required],
//       universityName: ['', Validators.required],
//       turnitin: [''],
//     });
//   }

//   ngOnInit(): void {
//     this.serviceService.getAllTopic().subscribe((res) => {
//       this.topics = res;
//     });
//   }

//   calculateTotalPrice(): void {
//     const typeOfServicePrice = this.typeOfServices.find(item => item.title === this.orderForm.value.typeOfService)?.price || 0;
//     const subjectAreaPrice = this.subjectAreas.find(item => item.title === this.orderForm.value.subjectArea)?.price || 0;
//     const desiredGradePrice = this.desiredGrades.find(item => item.title === this.orderForm.value.desiredGrade)?.price || 0;
//     const deadlinePrice = this.deadlines.find(item => item.title === this.orderForm.value.deadline)?.price || 0;
//     const wordCount = this.orderForm.value.requiredWordCount || 0;
  
//     const perPageWordCount = 1200;
//     this.gbpTotalCost = Math.round((typeOfServicePrice + subjectAreaPrice + desiredGradePrice + deadlinePrice) * wordCount / perPageWordCount);
  
//     this.orderForm.patchValue({ totalPrice: this.gbpTotalCost });
//   }

//   onSubmit(): void {
//     if (this.orderForm.invalid) {
//       Object.keys(this.orderForm.controls).forEach(field => {
//         const control = this.orderForm.get(field);
//         if (control && control.invalid) {
//           const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
//           this.toastr.error(`Please correct the ${fieldName} field`, 'Form Invalid');
//         }
//       });
//       return;
//     } else {
//       const orderPayload = {
//         Name: this.orderForm.value.email.split("@")[0],
//         Email: this.orderForm.value.email,
//         Phone: this.orderForm.value.contactNumber,
//         WordsORPages: 'words',
//         NumberOfWordsPages: this.orderForm.value.requiredWordCount,
//         Topic: this.orderForm.value.topic,
//         DetailInstructions: this.orderForm.value.detailInstructions,
//         TypeofHelpRequire: this.orderForm.value.typeOfService,
//         LineSpacing: 2, // Assuming a default value for now
//         SoftwareService: 'N/A', // Assuming a default value for now
//         TopicCategory: this.orderForm.value.subjectArea,
//         PresentationSlides: 0, // Assuming a default value for now
//         SourceReferences: this.orderForm.value.numberOfReferences,
//         WritingStyle: this.orderForm.value.referencingStyle,
//         PreferredLanguageLevel: 'English', // Assuming a default value for now
//         EducationLevel: this.orderForm.value.level,
//         PaperStandard: this.orderForm.value.desiredGrade,
//         DeadLine: this.orderForm.value.deadline,
//         BeforeDiscount: 0,
//         DiscountCode: '',
//         GrossAmount: this.orderForm.value.totalPrice,
//         Status: 'New',
//         PaidStatus: 'Unpaid',
//         suportingDoc: '',
//         isSample: false
//       };

//       this.orderService.createOrder(orderPayload).subscribe(
//         response => {
//           this.toastr.success('Order created successfully', 'Success');
//         },
//         error => {
//           this.toastr.error('Error creating order', 'Error');
//         }
//       );

//       this.orderEvent.emit(orderPayload);
//     }
//   }
// }
























// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { OrderService } from 'src/app/services/order.service';
// import { ServicesService } from 'src/app/services/services.service';
// import { ToastrService } from 'ngx-toastr';

// @Component({
//   selector: 'app-order-form',
//   templateUrl: './order-form.component.html',
//   styleUrls: ['./order-form.component.css'],
// })
// export class OrderFormComponent implements OnInit {
//   @Input() categories: any;
//   orderForm: FormGroup;
//   gbpTotalCost: number = 0;
//   topics: any[] = [];

//   typeOfServices: Array<{ title: string, price: number }> = [
//     { title: 'Dissertation Writing', price: 50 },
//     { title: 'Research Proposal Writing', price: 40 },
//     { title: 'Dissertation Proofreading & Editing', price: 30 }
//   ];

//   subjectAreas: Array<{ title: string, price: number }> = [
//     { title: 'Business', price: 10 },
//     { title: 'Engineering', price: 15 },
//     { title: 'Law', price: 20 },
//     { title: 'Medicine', price: 25 },
//     { title: 'Science', price: 12 },
//     { title: 'Arts', price: 8 }
//   ];

//   desiredGrades: Array<{ title: string, price: number }> = [
//     { title: '1st Class Standard (80%+)', price: 70 },
//     { title: '2:1 Standard (70%+)', price: 60 },
//     { title: '2:2 Standard (50%-60%+)', price: 50 }
//   ];

//   deadlines: Array<{ title: string, price: number }> = [
//     { title: '48 Hours Urgent Delivery', price: 100 },
//     { title: '3 Days Urgent Delivery', price: 80 },
//     { title: '5 Days Delivery', price: 60 },
//     { title: '10 Days Delivery', price: 40 },
//     { title: '15 Days Delivery', price: 20 },
//     { title: '25 Days Delivery', price: 10 },
//     { title: '30 Days Delivery', price: 5 }
//   ];

//   referencingStyles: Array<{ title: string, price: number }> = [
//     { title: 'Harvard', price: 0 },
//     { title: 'APA', price: 0 },
//     { title: 'MLA', price: 0 },
//     { title: 'OSCOLA', price: 0 },
//     { title: 'Oxford', price: 0 },
//     { title: 'Other', price: 0 }
//   ];

//   paymentPlans: Array<{ title: string, additionalCost: number }> = [
//     { title: 'Pay in full', additionalCost: 0 },
//     { title: 'Pay in 2 Instalments', additionalCost: 10 },
//     { title: 'Pay in 3 Instalments', additionalCost: 20 },
//     { title: 'Pay in 4 Instalments', additionalCost: 30 }
//   ];

//   @Output() orderEvent = new EventEmitter();

//   constructor(
//     private formBuilder: FormBuilder,
//     private orderService: OrderService,
//     private serviceService: ServicesService,
//     private toastr: ToastrService
//   ) {
//     this.orderForm = this.formBuilder.group({
//       typeOfService: ['', Validators.required],
//       subjectArea: ['', Validators.required],
//       level: ['', Validators.required],
//       requiredWordCount: ['', Validators.required],
//       desiredGrade: ['', Validators.required],
//       deadline: ['', Validators.required],
//       topic: ['', Validators.required],
//       detailInstructions: ['', Validators.required],
//       referencingStyle: ['', Validators.required],
//       numberOfReferences: ['', Validators.required],
//       totalPrice: [{ value: '', disabled: true }, Validators.required],
//       paymentPlan: ['', Validators.required],
//       paymentSchedule: ['', Validators.required],
//       email: ['', [Validators.required, Validators.email]],
//       contactNumber: ['', Validators.required],
//       universityName: ['', Validators.required],
//       turnitin: [''],
//     });
//   }

//   ngOnInit(): void {
//     this.serviceService.getAllTopic().subscribe((res) => {
//       this.topics = res;
//     });
//   }

//   calculateTotalPrice(): void {
//     const typeOfServicePrice = this.typeOfServices.find(item => item.title === this.orderForm.value.typeOfService)?.price || 0;
//     const subjectAreaPrice = this.subjectAreas.find(item => item.title === this.orderForm.value.subjectArea)?.price || 0;
//     const desiredGradePrice = this.desiredGrades.find(item => item.title === this.orderForm.value.desiredGrade)?.price || 0;
//     const deadlinePrice = this.deadlines.find(item => item.title === this.orderForm.value.deadline)?.price || 0;
//     const wordCount = this.orderForm.value.requiredWordCount || 0;
  
//     const perPageWordCount = 1200;
//     this.gbpTotalCost = Math.round((typeOfServicePrice + subjectAreaPrice + desiredGradePrice + deadlinePrice) * wordCount / perPageWordCount);
  
//     const paymentPlanCost = this.paymentPlans.find(item => item.title === this.orderForm.value.paymentPlan)?.additionalCost || 0;

    
//     const finalCost = Math.round(this.gbpTotalCost + paymentPlanCost);
//     console.log(paymentPlanCost, "===paymentPlanCostpaymentPlanCostpayment", finalCost);
  
//     this.orderForm.patchValue({ totalPrice: finalCost });
//   }

//   onSubmit(): void {
//     if (this.orderForm.invalid) {
//       console.log(this.orderForm.invalid, "===isInvaliddd");
      
//       Object.keys(this.orderForm.controls).forEach(field => {
//         const control = this.orderForm.get(field);
//         console.log(control, "===controllaaaa");
        
//         if (control && control.invalid) {
//           const fieldName = field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
//           this.toastr.error(`Please correct the ${fieldName} field`, 'Form Invalid');
//         }
//       });
//       return;
//     } else {
//       const orderPayload = {
//         Name: this.orderForm.value.email.split("@")[0],
//         Email: this.orderForm.value.email,
//         Phone: this.orderForm.value.contactNumber,
//         WordsORPages: 'words',
//         NumberOfWordsPages: this.orderForm.value.requiredWordCount,
//         Topic: this.orderForm.value.topic,
//         DetailInstructions: this.orderForm.value.detailInstructions,
//         TypeofHelpRequire: this.orderForm.value.typeOfService,
//         LineSpacing: 2, // Assuming a default value for now
//         SoftwareService: 'N/A', // Assuming a default value for now
//         TopicCategory: this.orderForm.value.subjectArea,
//         PresentationSlides: 0, // Assuming a default value for now
//         SourceReferences: this.orderForm.value.numberOfReferences,
//         WritingStyle: this.orderForm.value.referencingStyle,
//         PreferredLanguageLevel: 'English', // Assuming a default value for now
//         EducationLevel: this.orderForm.value.level,
//         PaperStandard: this.orderForm.value.desiredGrade,
//         DeadLine: this.orderForm.value.deadline,
//         BeforeDiscount: 0,
//         DiscountCode: '',
//         GrossAmount: this.orderForm.value.totalPrice,
//         Status: 'New',
//         PaidStatus: 'Unpaid',
//         suportingDoc: '',
//         isSample: false
//       };

//       console.log(orderPayload, "===orderPayload");

//       this.orderService.createOrder(orderPayload).subscribe(
//         response => {
//           this.toastr.success('Order created successfully', 'Success');
//         },
//         error => {
//           this.toastr.error('Error creating order', 'Error');
//         }
//       );

//       this.orderEvent.emit(orderPayload);
//     }
//   }
// }
