import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],
})
export class OrderFormComponent implements OnInit {
  @Input()
  categories:any;
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
  fileUrl:String = "";
  payload: any = {
    name: '',
    email: '',
    educationLevel: '',
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

  @Output() orderEvent = new EventEmitter();

  constructor(private formBuilder: FormBuilder,private orderService:OrderService) {
    this.orderForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      country: ['UK (+44)', Validators.required],
      contactPhone: ['', Validators.required],
      writingService: ['', Validators.required],
      helpRequire: ['',Validators.required],
      topic: ['', Validators.required],
      yourTopic: ['', Validators.required],
      detailInstructions: ['', Validators.required],
      sourcesRef: ['', Validators.required],
      categoryLevel: [''],
      preSlide: ['', Validators.required],
      categoryLev: [''],
      writingStyle: ['', Validators.required],
      languageStyle: ['', Validators.required],
      lineSpace: ['', Validators.required],
      farmaish: ['', Validators.required],
      pageWords: ['', Validators.required],
      eduLevel: ['', Validators.required],
      paperStnd: ['', Validators.required],
      deadline: ['', Validators.required],
      payment: ['', Validators.required],
      referred: ['', Validators.required],
      terms: ['', Validators.required],
      softService: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  wordsORPagesChanged(event: any): void {
    console.log(this.orderForm.value?.pageWords);
    if (this.services[3].value == 'pages') {
      if (
        this.orderForm.value?.lineSpacing == 2 ||
        this.orderForm.value?.lineSpacing == 0
      ) {
        this.services[3].Price = parseInt(this.orderForm.value?.pageWords) * 10;
      } else if (this.orderForm.value?.lineSpacing == 1) {
        this.services[3].Price = parseInt(this.orderForm.value?.pageWords) * 20;
      } else if (this.orderForm.value?.lineSpacing == 1.5) {
        this.services[3].Price = parseInt(this.orderForm.value?.pageWords) * 15;
      }
      this.calculateGBP(
        4,
        this.orderForm.value?.pageWords,
        this.payload.requiredNumberOfPages
      );
      this.payload.requiredNumberOfPages = this.orderForm.value?.pageWords;
    } else if (this.services[3].value == 'words') {
      let basePrice = 0.03;
      this.services[3].Price =
        parseInt(this.orderForm.value?.pageWords) * basePrice;
      this.calculateGBP(
        3,
        this.orderForm.value?.pageWords,
        this.payload.requiredNumberOfWords
      );
      this.payload.requiredNumberOfWords = this.orderForm.value?.pageWords;
    }
  }

  numberOfWordsORPagesChanged(event: any): void {
    if (this.services[3].value === 'pages') {
      if (
        this.orderForm.value?.lineSpacing === 2 ||
        this.orderForm.value.lineSpacing === 0
      ) {
        this.services[3].Price =
          parseInt(this.orderForm.value.pageWords.toString()) * 10;
      } else if (this.orderForm.value.lineSpacing === 1) {
        this.services[3].Price =
          parseInt(this.orderForm.value.pageWords.toString()) * 20;
      } else if (this.orderForm.value.lineSpacing === 1.5) {
        this.services[3].Price =
          parseInt(this.orderForm.value.pageWords.toString()) * 15;
      }
      this.calculateGBP(
        4,
        this.orderForm.value.pageWords,
        this.payload.requiredNumberOfPages
      );
      this.payload.requiredNumberOfPages = this.orderForm.value.pageWords;
    } else if (this.services[3].value === 'words') {
      const basePrice = 0.03;
      this.services[3].Price =
        parseInt(this.orderForm.value.pageWords.toString()) * basePrice;
      this.calculateGBP(
        3,
        this.orderForm.value.pageWords,
        this.payload.requiredNumberOfWords
      );
      this.payload.requiredNumberOfWords = this.orderForm.value.pageWords;
    }
  }

  deadLineChanged(event: any): void {
    this.payload.deadLine = event.target.selectedOptions[0].innerText;
    let time = parseInt(this.services[2].value);
    if (time >= 24) {
      this.services[2].Price = 20;
    } else {
      this.services[2].Price = 25;
    }
    this.calculateGBP(
      4,
      this.payload.totalPagesORWords,
      this.payload.requiredNumberOfPages
    );
  }

  topicCatogeryChanged(event:any):void{
    this.payload.topicCatogery =event.target.selectedOptions[0].innerText;
  }
  
  educationLevelChanged(event:any):void{
    this.payload.educationLevel =event.target.selectedOptions[0].innerText;
  }

  softwareServiceChanged(event: any): void {
    console.log(event.target.selectedOptions[0].innerText);
    this.payload.softwareAsService = event.target.selectedOptions[0].innerText
    this.services[0].Price = parseInt(this.orderForm.value.softService);
    console.log(this.services);
    this.calculateGBP(2, this.orderForm.value.softService);
  }
  numberOfSlidesChanged(event: any): void {
    this.services[1].Price = parseInt(this.orderForm.value.preSlide) * 5;
    this.calculateGBP(
      1,
      this.orderForm.value.preSlide,
      this.payload.numberOfPresentationSlides
    );
    this.payload.numberOfPresentationSlides = this.orderForm.value.preSlide;
  }

  calculateGBP(key?: any, value?: any, previousValue?: any): void {
    console.log(key, value, previousValue);
    let totalCost = 0;
    this.services.forEach(function (item, index) {
      totalCost = totalCost + item.Price;
      console.log(item);
    });
    this.gbp = totalCost.toString();
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
  onSubmit(): void {
    if (this.orderForm.invalid) {
      console.log(this.orderForm.value)
      console.log(this.orderForm)
      console.log(this.orderForm.invalid)
      return;
    } else {
      console.log(this.orderForm.value)
      const orderPayload = {
        Name:this.orderForm.value?.firstName,
        Phone:this.orderForm.value?.country.split(' ')[1]+' '+this.orderForm.value?.contactPhone,
        Email: this.orderForm.value?.email,
        WordsORPages: this.orderForm.value.softService,
        NumberOfWordsPages: this.orderForm.value.pageWords,
        Topic: this.orderForm.value.yourTopic,
        DetailInstructions: this.orderForm.value.detailInstructions,
        TypeofHelpRequire: "",
        LineSpacing: this.orderForm.value.lineSpace,
        SoftwareService: this.payload.softwareAsService,
        TopicCategory: this.payload.topicCatogery,
        PresentationSlides: this.payload.numberOfPresentationSlides,
        SourceReferences: this.orderForm.value.sourcesRef,
        WritingStyle: this.orderForm.value.writingStyle,
        PreferredLanguageLevel: this.orderForm.value.languageStyle,
        EducationLevel: this.payload.educationLevel,
        PaperStandard: this.orderForm.value.paperStnd,
        DeadLine: this.payload.deadLine,
        BeforeDiscount: 0,
        DiscountCode: '',
        GrossAmount: this.gbp,
        Status: 'New',
        PaidStatus: 'Unpaid',
        suportingDoc:this.fileUrl,
        isSample:false,
      };
      console.log(orderPayload)
      this.orderEvent.emit(orderPayload);
    }
  }
}
