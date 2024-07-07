import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { Observable } from 'rxjs';
import  * as Quill  from 'ngx-quill';
import { SamplesService } from 'src/app/services/samples.service';
@Component({
  selector: 'app-admin-samples',
  templateUrl: './admin-samples.component.html',
  styleUrls: ['./admin-samples.component.css'],
})
export class AdminSamplesComponent {
  addSamples: boolean = false;
  samples: any[] = [];
  displayData: any[] = [];
  chunkedArray: any;
  selectedSample: any;
  samplesForm!: FormGroup;
  pageNo: number = 1;
  noOfPages: number = 1;
  currentPage: number = 1;
  searchKey:string = "";

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    uploadUrl: 'https://proassignmentbackend.smartedultd.co.uk/api/v1/upload/fileuploadAdmin',
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
      { class: 'verdana', name: 'Verdana' },
      { class: 'courier-new', name: 'Courier New' },
      { class: 'arial-black', name: 'Arial Black' },
      { class: 'book-antiqua', name: 'Book Antiqua' },
      { class: 'tahoma', name: 'Tahoma' },
      { class: 'trebuchet-ms', name: 'Trebuchet MS' },
      { class: 'garamond', name: 'Garamond' },
      { class: 'cambria', name: 'Cambria' },
      { class: 'helvetica', name: 'Helvetica' },
      { class: 'arial-narrow', name: 'Arial Narrow' },
      { class: 'rockwell', name: 'Rockwell' },
      { class: 'century-gothic', name: 'Century Gothic' },
      { class: 'franklin-gothic-medium', name: 'Franklin Gothic Medium' },
      { class: 'arial-rounded', name: 'Arial Rounded' },
    ],    
  };
 
  constructor(
    private samplesService: SamplesService,
    private formBuilder: FormBuilder
  ) {}
  onClickAddSamples(sample?: any): void {
    this.samplesService.getSampleBySlug(sample).subscribe((res)=>{
      this.selectedSample = res.data;
      this.addSamples = !this.addSamples;
      this.generateForm();
    })
  }
  ngOnInit(): void {
    this.getServices();
  }
  getServices(): void {
    this.samplesService.getSamples().subscribe((res: any) => {
      this.samples = res.data;
      this.chunkedArray = this.chunkArray(res.data, 25);
      this.displayData = this.chunkedArray[0];
      this.noOfPages = Math.trunc(res.data.length / 25) + 1;
    });
  }

  generateForm(): void {
    this.samplesForm = this.formBuilder.group({
      Title: [
        this.selectedSample ? this.selectedSample?.Title : '',
        Validators.required,
      ],
      Slug: [
        this.selectedSample ? this.selectedSample?.Slug : '',
        [Validators.required],
      ],
      keywords: [
        this.selectedSample ? this.selectedSample?.MetaKeyword : '',
        Validators.required,
      ],
      metaTitle: [
        this.selectedSample ? this.selectedSample?.MetaTitle : '',
        Validators.required,
      ],
      metaDescription: [
        this.selectedSample ? this.selectedSample?.MetaDescription : '',
        Validators.required,
      ],
      price: [
        this.selectedSample ? this.selectedSample?.Price : '',
        Validators.required,
      ],
      discount: [
        this.selectedSample ? this.selectedSample?.DiscountPrice : '',
        Validators.required,
      ],
      description: [
        this.selectedSample ? this.selectedSample?.Description.join() : '',
        Validators.required,
      ],
    });
  }
  submitForm(flag: any): void {
    if (this.samplesForm.invalid) {
      return;
    }
    const payload = {
      title: this.samplesForm.value?.Title,
      slug: this.samplesForm.value?.Slug,
      description: this.samplesForm.value?.description,
      meta_title: this.samplesForm.value?.pageTitle,
      metaKeymeta_keywordWord: this.samplesForm.value?.keywords,
      meta_description: this.samplesForm.value?.metaDescription,
      price: this.samplesForm.value?.price,
      discount_price: this.samplesForm.value?.discount,
    };
    if (flag === 'add') {
      this.samplesService.create(payload).subscribe((res: any) => {
        if (res.data.insertId) {
          this.addSamples = !this.addSamples;
          this.getServices();
        }
      });
    } else {
      this.samplesService
        .update(payload, this.selectedSample.Id)
        .subscribe((res: any) => {
          if (res.data.affectedRows) {
            this.addSamples = !this.addSamples;
          }
        });
    }
  }

  deleteSample(id: number): void {
    this.samplesService.delete(id).subscribe((res) => {
      window.location.reload();
    });
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  onSearch(event: KeyboardEvent){
    console.log(event.key)
    if (event.key === 'Enter') {
      this.displayData = this.samples.filter(element => element?.Title?.includes(this.searchKey) || element.Slug.includes(this.searchKey));
    }else if(event.key === 'Backspace' && this.searchKey === ''){
      this.displayData = this.samples;
    }
  }

  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }
}
