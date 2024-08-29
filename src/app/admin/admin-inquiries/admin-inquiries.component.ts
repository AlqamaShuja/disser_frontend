import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-admin-inquiries',
  templateUrl: './admin-inquiries.component.html',
  styleUrls: ['./admin-inquiries.component.css']
})
export class AdminInquiriesComponent implements OnInit {
  inquiries: any[] = [];
  selectedInquiry: any = {};
  deleteModalRef?: BsModalRef;

  constructor(private modalService: BsModalService, private inquiryService: ServicesService) {}

  ngOnInit(): void {
    this.inquiryService.getAllInquiries().subscribe(res => {
      this.inquiries = res;
    });
  }

  openDeleteModal(template: TemplateRef<any>, inquiry: any): void {
    this.selectedInquiry = inquiry;
    this.deleteModalRef = this.modalService.show(template);
  }

  confirmDelete(): void {
    this.inquiryService.deleteInquiry(this.selectedInquiry.id).subscribe(
      () => {
        this.inquiries = this.inquiries.filter(inquiry => inquiry.id !== this.selectedInquiry.id);
        this.deleteModalRef?.hide();
      },
      error => {
        console.error('Error deleting inquiry:', error);
      }
    );
  }
}
