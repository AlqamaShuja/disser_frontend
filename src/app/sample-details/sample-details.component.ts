import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { SamplesService } from '../services/samples.service';
import { GlobalService } from '../services/global.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-sample-details',
  templateUrl: './sample-details.component.html',
  styleUrls: ['./sample-details.component.css'],
})
export class SampleDetailsComponent {
  selectedSample: any = null;
  orderForm: FormGroup;
  gbpTotalCost: Number = 0;
  gbp: string = '';
  services: Array<any> = [
    {
      Id: 1,
      name: 'softwareAsService',
      Price: 0,
      value: '0',
      isactive: false,
    },
    {
      Id: 2,
      name: 'presentaionSlides',
      Price: 0,
      value: '0',
      isactive: false,
    },
    {
      Id: 3,
      name: 'deadLine',
      Price: 0,
      value: '',
      isactive: false,
    },
    {
      Id: 4,
      name: 'words',
      Price: 0,
      value: 'words',
      isactive: false,
    },
  ];
  fileUrl: String = '';
  payload: any = {
    name: '',
    email: '',
    number: '',
    typeOfWritingService: '',
    typeOfHelpRequired: '',
    topicCatogery: '',
    yourTopic: '',
    detailInstruction: '',
    numberOfReferences: '',
    numberOfPresentationSlides: 0,
    softwareAsService: '',
    writingStyleCitation: '',
    preferedLanguage: '',
    lineSpacing: 2,
    requiredNumberOfPages: 0,
    requiredNumberOfWords: 0,
    deadLine: '',
    totalCost: '0.00',
    paymentType: '',
    referedBy: '',
  };
  showModal: boolean = false;

  constructor(
    private sanitizer: DomSanitizer,
    private sampleService: SamplesService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private orderService: OrderService,
    private globalService: GlobalService,
    private router: Router
  ) {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('slug'));
      this.sampleService.getSampleBySlug(params.get('slug')).subscribe((res) => {
        if(res.data){
          console.log(res.data,'THE RESPONSE DATA')
          this.selectedSample = res.data;
        }else{
          this.router.navigate(['/not-found'])
        }
      });
    });
    this.orderForm = this.formBuilder.group({
      firstName: [''],
      email: [''],
      contactPhone: [''],
      writingService: [''],
      helpRequire: [''],
      topic: [''],
      yourTopic: [''],
      detailInstructions: [''],
      sourcesRef: [''],
      categoryLevel: [''],
      preSlide: [''],
      categoryLev: [''],
      writingStyle: [''],
      languageStyle: [''],
      lineSpace: [''],
      farmaish: [''],
      pageWords: [''],
      eduLevel: [''],
      paperStnd: [''],
      deadline: [''],
      payment: [''],
      referred: [''],
      terms: [''],
      fileUrl:[null],
      softService: [0],
    });
  }
  handleShowModal(): void {
    console.log('in sjpw');
    this.showModal = true;
  }
  submitOrder(event: any): void {
    if (this.orderForm.invalid) {
      return;
    }
    this.showModal = false;
    const orderPayload = {
      Name: this.orderForm.value?.firstName,
      Phone: this.orderForm.value?.contactPhone,
      Email: this.orderForm.value?.email,
      WordsORPages: this.orderForm.value.softService,
      NumberOfWordsPages: this.orderForm.value.pageWords,
      Topic: this.orderForm.value.topic,
      DetailInstructions: this.orderForm.value.detailInstructions,
      TypeofHelpRequire: '',
      LineSpacing: this.orderForm.value.lineSpace,
      SoftwareService: this.payload.softwareAsService,
      TopicCategory: this.payload.topicCatogery,
      PresentationSlides: this.payload.numberOfPresentationSlides,
      SourceReferences: this.orderForm.value.sourcesRef,
      WritingStyle: this.orderForm.value.writingStyle,
      PreferredLanguageLevel: this.orderForm.value.languageStyle,
      EducationLevel: this.orderForm.value.eduLevel,
      PaperStandard: this.orderForm.value.paperStnd,
      DeadLine: this.orderForm.value.deadline,
      BeforeDiscount: 0,
      DiscountCode: '',
      GrossAmount: this.selectedSample.DiscountPrice,
      Status: 'New',
      PaidStatus: 'Unpaid',
      suportingDoc:this.fileUrl,
      isSample:true
    };
    this.orderService.createOrder(orderPayload).subscribe((res) => {
      console.log(res.data);
      this.globalService.dataSubject$.next(res.data);
      this.router.navigate(['/order']);
    });
  }

  onFileSelected(event: any): void {
    const selectedFile: File = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append('image', selectedFile);
      this.orderService.uploadDocuments(formData).subscribe((res)=>{
        this.fileUrl = res.filename;
        console.log(res)
        console.log('Selected File:', selectedFile);
      })      

      // If you want to upload the file to a server, you can use HttpClient or a dedicated file upload library
      // Example: this.uploadFile(selectedFile);
    }
  }

  getSafeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
