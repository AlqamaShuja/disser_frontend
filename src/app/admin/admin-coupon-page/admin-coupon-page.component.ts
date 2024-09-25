import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-coupon-page',
  templateUrl: './admin-coupon-page.component.html',
  styleUrls: ['./admin-coupon-page.component.css']
})
export class AdminCouponPageComponent implements OnInit {
  coupons: any = []; 

  selectedCoupon: any = {};
  isEditMode: boolean = false;
  couponModalRef?: BsModalRef;
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.serviceService.getAllCoupons().subscribe(res => {
      console.log(res, "===res.couponsssss");
      this.coupons = res;
    })
   }

  openCouponModal(template: TemplateRef<any>, coupon: any = null): void {
    if (coupon) {
      this.isEditMode = true;
      this.selectedCoupon = { ...coupon }; // Clone the coupon object
    } else {
      this.isEditMode = false;
      this.selectedCoupon = { code: '', currency: 'GBP', discount: '', duration: 'Lifetime', status: 'Active', isShowToAll: true };
    }
    this.couponModalRef = this.modalService.show(template);
  }

  saveCoupon(): void {
    
    if (this.isEditMode) {
      // Find the coupon and update it
      const index = this.coupons.findIndex((c: any) => c.id === this.selectedCoupon.id);
      console.log(this.selectedCoupon, "this.selectedCoupon, ", index);
      if (index !== -1) {
        this.coupons[index] = { ...this.selectedCoupon };
        this.serviceService.updateCoupon(this.selectedCoupon?.id, this.selectedCoupon).subscribe(
          response => {
            console.log('Content saved successfully:', response);
            alert("Successfully Added");
            this.coupons.push({ ...this.selectedCoupon });
            this.couponModalRef?.hide();
          },
          error => {
            console.error('Error saving content:', error);
            alert("Error Updating Content: " + error.message);
          }
        );
      }
    } else {
      // Add a new coupon
      console.log(this.selectedCoupon, "====selecttedCouponssss");
      this.serviceService.addCoupon(this.selectedCoupon).subscribe(
        response => {
          console.log('Content saved successfully:', response);
          alert("Successfully Added");
          this.coupons.push({ ...this.selectedCoupon });
          this.couponModalRef?.hide();
        },
        error => {
          console.error('Error saving content:', error);
          alert("Error Updating Content: " + error.message);
        }
      );
    }
  }

  onStatusChange(coupon: any): void {
    console.log('Status changed to:', coupon);
    this.serviceService.updateCoupon(coupon.id, coupon).subscribe(res => {
      alert("Updated");
    })
  }

  openDeleteModal(template: TemplateRef<any>, coupon: any): void {
    this.selectedCoupon = coupon;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    // Implement the delete logic here
    this.coupons = this.coupons.filter((c: any) => c.code !== this.selectedCoupon.code);
    this.deleteModalRef?.hide();
  }
}







































// import { Component, OnInit, TemplateRef } from '@angular/core';
// import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
// import { ServicesService } from 'src/app/services/services.service';

// @Component({
//   selector: 'app-admin-coupon-page',
//   templateUrl: './admin-coupon-page.component.html',
//   styleUrls: ['./admin-coupon-page.component.css']
// })
// export class AdminCouponPageComponent implements OnInit {
//   coupons: any = []; 

//   selectedCoupon: any = {};
//   isEditMode: boolean = false;
//   couponModalRef?: BsModalRef;
//   deleteModalRef?: BsModalRef;

//   constructor(private modalService: BsModalService, private serviceService: ServicesService) { }

//   ngOnInit(): void {
//     this.serviceService.getAllCoupons().subscribe(res => {
//       console.log(res, "===res.couponsssss");
//       this.coupons = res;
//     })
//    }

//   openCouponModal(template: TemplateRef<any>, coupon: any = null): void {
//     if (coupon) {
//       this.isEditMode = true;
//       this.selectedCoupon = { ...coupon }; // Clone the coupon object
//     } else {
//       this.isEditMode = false;
//       this.selectedCoupon = { code: '', currency: 'GBP', discount: '', duration: 'Lifetime', status: 'Active' };
//     }
//     this.couponModalRef = this.modalService.show(template);
//   }

//   saveCoupon(): void {
    
//     if (this.isEditMode) {
//       // Find the coupon and update it
//       const index = this.coupons.findIndex((c: any) => c.id === this.selectedCoupon.id);
//       console.log(this.selectedCoupon, "this.selectedCoupon, ", index);
//       if (index !== -1) {
//         this.coupons[index] = { ...this.selectedCoupon };
//         this.serviceService.updateCoupon(this.selectedCoupon?.id, this.selectedCoupon).subscribe(
//           response => {
//             console.log('Content saved successfully:', response);
//             alert("Successfully Added");
//             this.coupons.push({ ...this.selectedCoupon });
//             this.couponModalRef?.hide();
//           },
//           error => {
//             console.error('Error saving content:', error);
//             alert("Error Updating Content: " + error.message);
//           }
//         );
//       }
//     } else {
//       // Add a new coupon
//       // this.coupons.push({ ...this.selectedCoupon });
//       console.log(this.selectedCoupon, "====selecttedCouponssss");
//       this.serviceService.addCoupon(this.selectedCoupon).subscribe(
//         response => {
//           console.log('Content saved successfully:', response);
//           alert("Successfully Added");
//           this.coupons.push({ ...this.selectedCoupon });
//           this.couponModalRef?.hide();
//         },
//         error => {
//           console.error('Error saving content:', error);
//           alert("Error Updating Content: " + error.message);
//         }
//       );
//     }
//   }

//   onStatusChange(coupon: any): void {
//     console.log('Status changed to:', coupon);
//     this.serviceService.updateCoupon(coupon.id, coupon).subscribe(res => {
//       alert("Updated");
//     })
//   }

//   openDeleteModal(template: TemplateRef<any>, coupon: any): void {
//     this.selectedCoupon = coupon;
//     this.deleteModalRef = this.modalService.show(template);
//   }

//   confirmDelete(): void {
//     // Implement the delete logic here
//     this.coupons = this.coupons.filter((c: any) => c.code !== this.selectedCoupon.code);
//     this.deleteModalRef?.hide();
//   }
// }
