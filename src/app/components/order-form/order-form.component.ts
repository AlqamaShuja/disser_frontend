import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';
import { ServicesService } from 'src/app/services/services.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  @Input() categories: any;
  @Output() orderEvent = new EventEmitter();
  orderForm: FormGroup;
  gbpTotalCost: number = 0; // Total price before discount
  discountedTotalCost: number = 0; // Total price after discount
  topics: any[] = [];
  academicLevel: any[] = [];
  coupons: any[] = [];
  allCoupons: any[] = [];
  selectedCoupon: any = null;
  customCouponMessage: string = ''; // Message for custom coupon validation
  currentUser: any = {};

  typeOfServices: Array<{ title: string, price: string, id: number, subServices: [], }> = [];
  subjectAreas: Array<{ title: string, price: number, id: number }> = [];
  desiredGrades: any[] = [];
  deadlinePrice: any[] = [];
  deadlines: Array<{ title: string, price: number }> = [
    { title: '2 Days Urgent Delivery', price: 100 },
    { title: '3 Days Urgent Delivery', price: 80 },
    { title: '5 Days Delivery', price: 60 },
    { title: '10 Days Delivery', price: 40 },
    { title: '15 Days Delivery', price: 20 },
    { title: '25 Days Delivery', price: 10 },
    { title: '30 Days Delivery', price: 5 },
  ];
  referencingStyles: Array<{ title: string, price: number }> = [
    { title: 'Harvard', price: 0 },
    { title: 'APA', price: 0 },
    { title: 'MLA', price: 0 },
    { title: 'OSCOLA', price: 0 },
    { title: 'Oxford', price: 0 },
    { title: 'Other', price: 0 },
  ];
  subServices: Array<{ title: string, price: string, id: number }> = [];
  isPrivacyPolicyAgreed: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private serviceService: ServicesService,
    private toastr: ToastrService,
    private route: ActivatedRoute
  ) {
    this.orderForm = this.formBuilder.group({
      typeOfService: ['', Validators.required],
      subService: [''],
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
      coupon: [''] // This is the only input field we will use for both selection and typing
    });
  }

  ngOnInit(): void {
    if(localStorage){
      this.currentUser = JSON.parse(localStorage.getItem("user") || "{}");
      this.orderForm.patchValue({ email: this.currentUser.email });
      this.orderForm.patchValue({ contactNumber: this.currentUser.phone_number });
    }

    // Fetch data for dropdowns and other fields
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
    this.serviceService.getAllGrades().subscribe((res) => {
      this.desiredGrades = res;
    });
    this.serviceService.getAllOrderPrices().subscribe((res) => {
      this.deadlinePrice = res;
    });
    this.serviceService.getAllActieCoupons().subscribe((res) => {
      this.allCoupons = res;
      this.coupons = res.filter((cou: any) => cou.isShowToAll == true);
      console.log(res, "====res:activecouponss");

      // Check for coupon query parameter and set coupon
      this.route.queryParams.subscribe(params => {
        const couponId = this.coupons.find((cou: any) => cou.id == params['coupon']);;
        if (couponId) {
          this.orderForm.patchValue({ coupon: couponId.code });
          this.applyCoupon(couponId.id);
        }
      });
    });
  }

  onCouponChange(event: any): void {
    const input = event.target.value.trim();
    if (input) {
      const matchedCoupon = this.allCoupons.find(coupon => coupon.code.toLowerCase() === input.toLowerCase());
      if (matchedCoupon) {
        this.selectedCoupon = matchedCoupon;
        this.customCouponMessage = `${matchedCoupon.code} applied`;
        this.calculateTotalPrice();
      } else {
        this.selectedCoupon = null;
        this.customCouponMessage = 'Coupon does not exist.';
        this.calculateTotalPrice();
      }
    } else {
      this.selectedCoupon = null;
      this.customCouponMessage = '';
    }
  }

  applyCoupon(couponId: string): void {
    this.selectedCoupon = this.coupons.find(coupon => coupon.id === parseInt(couponId, 10));
    if (this.selectedCoupon) {
      this.customCouponMessage = `${this.selectedCoupon.code} applied`;
      this.calculateTotalPrice();
    } else {
      this.customCouponMessage = '';
    }
  }

  calculateTotalPrice(): void {
    const typeOfServicePrice = this.typeOfServices.find(item => item.title === this.orderForm.value.typeOfService)?.price || 0;
    const subjectAreaPrice = this.subjectAreas.find(item => item.title === this.orderForm.value.subjectArea)?.price || 0;
    const academicLevelPrice = this.academicLevel.find(item => item.title === this.orderForm.value.level)?.price || 0;
    const desiredGradePrice = this.desiredGrades.find((item: any) => item.title === this.orderForm.value.desiredGrade)?.price || 0;
    const topicPrice = this.topics.find((item: any) => item.title === this.orderForm.value.topic)?.price || 0;

    // Include sub-service price if selected
    const subServicePrice = this.orderForm.value.subService ? this.orderForm.value.subService.price : 0;

    const days = Number(this.orderForm.value.deadline.split(" ")[0]);
    const wordCount = this.orderForm.value.requiredWordCount || 0;

    const matchingOrderPrice = this.deadlinePrice.find((priceRange: any) => days >= priceRange.min_day && days <= priceRange.max_day);
    let priceByDeadline = matchingOrderPrice ? Number(matchingOrderPrice.price) : 0;

    const perPageWordCount = 1200;
    const numberOfPages = Math.ceil(Number(wordCount) / perPageWordCount);

    // Calculate total cost, including sub-service price
    this.gbpTotalCost = Math.round((Number(typeOfServicePrice) + Number(subjectAreaPrice) + Number(academicLevelPrice) + Number(desiredGradePrice) + priceByDeadline + Number(topicPrice) + Number(subServicePrice)) * numberOfPages);

    // Apply discount if a coupon is applied
    if (this.selectedCoupon) {
      const discountPercentage = Number(this.selectedCoupon.discount);
      const discountAmount = (this.gbpTotalCost * discountPercentage) / 100;
      this.discountedTotalCost = Math.round(this.gbpTotalCost - discountAmount);
    } else {
      this.discountedTotalCost = this.gbpTotalCost;
    }

    this.orderForm.patchValue({ totalPrice: this.discountedTotalCost });
  }
  // calculateTotalPrice(): void {
  //   const typeOfServicePrice = this.typeOfServices.find(item => item.title === this.orderForm.value.typeOfService)?.price || 0;
  //   const subjectAreaPrice = this.subjectAreas.find(item => item.title === this.orderForm.value.subjectArea)?.price || 0;
  //   const academicLevelPrice = this.academicLevel.find(item => item.title === this.orderForm.value.level)?.price || 0;
  //   const desiredGradePrice = this.desiredGrades.find((item: any) => item.title === this.orderForm.value.desiredGrade)?.price || 0;
  //   const topicPrice = this.topics.find((item: any) => item.title === this.orderForm.value.topic)?.price || 0;

  //   const days = Number(this.orderForm.value.deadline.split(" ")[0]);
  //   const wordCount = this.orderForm.value.requiredWordCount || 0;

  //   const matchingOrderPrice = this.deadlinePrice.find((priceRange: any) => days >= priceRange.min_day && days <= priceRange.max_day);
  //   let priceByDeadline = matchingOrderPrice ? Number(matchingOrderPrice.price) : 0;

  //   const perPageWordCount = 1200;
  //   const numberOfPages = Math.ceil(Number(wordCount) / perPageWordCount);

  //   this.gbpTotalCost = Math.round((Number(typeOfServicePrice) + Number(subjectAreaPrice) + Number(academicLevelPrice) + Number(desiredGradePrice) + priceByDeadline + Number(topicPrice)) * numberOfPages);

  //   // Calculate discount if a coupon is applied
  //   if (this.selectedCoupon) {
  //     const discountPercentage = Number(this.selectedCoupon.discount);
  //     const discountAmount = (this.gbpTotalCost * discountPercentage) / 100;
  //     this.discountedTotalCost = Math.round(this.gbpTotalCost - discountAmount);
  //   } else {
  //     this.discountedTotalCost = this.gbpTotalCost; // No discount applied
  //   }

  //   this.orderForm.patchValue({ totalPrice: this.discountedTotalCost });
  // }

  onServiceChange(event: any): void {
    const selectedService = this.orderForm.get('typeOfService')?.value;

    console.log("==ascmaskmckamkscms", selectedService, typeof selectedService);

    // Make sure it's actually an object
    if (typeof selectedService === 'object' && selectedService !== null) {
      if (selectedService.subServices) {
        this.subServices = selectedService.subServices; // Update sub-services for the selected service
      } else {
        this.subServices = []; // No sub-services for the selected service
      }
    } else {
      console.error("Selected service is not an object, check your ngValue usage.");
    }

    // Recalculate the total price
    this.calculateTotalPrice();
  }


  onSubmit(): void {
    if (this.orderForm.invalid) {
      this.orderForm.markAllAsTouched();
      return;
    }
    if (!this.isPrivacyPolicyAgreed) {
      this.toastr.warning('You must agree to the Privacy Policy to submit the order.');
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
      SubService: this.orderForm.value.subService ? this.orderForm.value.subService.title : '', // Include sub-service
      LineSpacing: 2,
      SoftwareService: 'N/A',
      TopicCategory: this.orderForm.value.subjectArea,
      PresentationSlides: 0,
      SourceReferences: this.orderForm.value.numberOfReferences,
      WritingStyle: this.orderForm.value.referencingStyle,
      PreferredLanguageLevel: 'English',
      EducationLevel: this.orderForm.value.level,
      PaperStandard: this.orderForm.value.desiredGrade,
      DeadLine: this.orderForm.value.deadline,
      BeforeDiscount: this.gbpTotalCost,
      DiscountCode: this.selectedCoupon?.code || this.orderForm.value.coupon || '',
      GrossAmount: this.discountedTotalCost,
      Status: 'New',
      PaidStatus: 'Unpaid',
      suportingDoc: '',
      isSample: false,
      Balance: this.discountedTotalCost,
    };

    console.log(orderPayload);

    this.orderEvent.emit(orderPayload); // Emit the event on success

    // Example for actual order service submission
    // this.orderService.createOrder(orderPayload).subscribe(
    //   response => {
    //     this.toastr.success('Order created successfully', 'Success');
    //   },
    //   error => {
    //     this.toastr.error('Error creating order', 'Error');
    //   }
    // );
  }

  // onSubmit(): void {
  //   if (this.orderForm.invalid) {
  //     // Mark all controls as touched to trigger validation messages
  //     this.orderForm.markAllAsTouched();
  //     return;
  //   }

  //   const orderPayload = {
  //     Name: this.orderForm.value.email.split("@")[0],
  //     Email: this.orderForm.value.email,
  //     Phone: this.orderForm.value.contactNumber,
  //     WordsORPages: 'words',
  //     NumberOfWordsPages: this.orderForm.value.requiredWordCount,
  //     Topic: this.orderForm.value.topic,
  //     DetailInstructions: this.orderForm.value.detailInstructions,
  //     TypeofHelpRequire: this.orderForm.value.typeOfService,
  //     LineSpacing: 2,
  //     SoftwareService: 'N/A',
  //     TopicCategory: this.orderForm.value.subjectArea,
  //     PresentationSlides: 0,
  //     SourceReferences: this.orderForm.value.numberOfReferences,
  //     WritingStyle: this.orderForm.value.referencingStyle,
  //     PreferredLanguageLevel: 'English',
  //     EducationLevel: this.orderForm.value.level,
  //     PaperStandard: this.orderForm.value.desiredGrade,
  //     DeadLine: this.orderForm.value.deadline,
  //     BeforeDiscount: this.gbpTotalCost,
  //     DiscountCode: this.selectedCoupon?.code || this.orderForm.value.coupon || '', // Include custom coupon if any
  //     GrossAmount: this.discountedTotalCost,
  //     Status: 'New',
  //     PaidStatus: 'Unpaid',
  //     suportingDoc: '',
  //     isSample: false,
  //     Balance: this.discountedTotalCost,
  //   };

  //   console.log(orderPayload, "===orderPayloadorderPayload");

  //   this.orderEvent.emit(orderPayload); // Emit the event on success

  //   // this.orderService.createOrder(orderPayload).subscribe(
  //   //   response => {
  //   //     this.toastr.success('Order created successfully', 'Success');
  //   //     this.orderEvent.emit(orderPayload); // Emit the event on success
  //   //   },
  //   //   error => {
  //   //     this.toastr.error('Error creating order', 'Error');
  //   //     alert('Error creating order');
  //   //   }
  //   // );
  // }

  resetForm(): void {
    this.orderForm.reset();
    this.gbpTotalCost = 0;
    this.discountedTotalCost = 0;
    this.isPrivacyPolicyAgreed = false;  // Reset checkbox as well
  }
}
