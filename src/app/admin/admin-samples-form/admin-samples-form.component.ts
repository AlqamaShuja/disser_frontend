import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { SamplesService } from 'src/app/services/samples.service';
import { ServicesService } from 'src/app/services/services.service';
import { BASEURL } from 'src/globals';

@Component({
  selector: 'app-admin-samples-form',
  templateUrl: './admin-samples-form.component.html',
  styleUrls: ['./admin-samples-form.component.css']
})
export class AdminSamplesFormComponent implements OnInit {
  @Input() selectedSample: any; // Receive the selected sample data
  @Output() close = new EventEmitter<void>();
  samplesForm!: FormGroup;
  topics: any = []; // Topics array for dropdown

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    uploadUrl: `${BASEURL}/upload/fileuploadAdmin`,
    customClasses: [],
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ]
  };

  constructor(
    private formBuilder: FormBuilder,
    private samplesService: SamplesService,
    private servicesService: ServicesService
  ) {}

  ngOnInit(): void {
    this.fetchDissertationTopics(); // Fetch topics data on initialization
    this.generateForm();
  }

  ngOnChanges(): void {
    this.generateForm(); // Regenerate the form whenever selectedSample changes
  }

  generateForm(): void {
    this.samplesForm = this.formBuilder.group({
      Title: [this.selectedSample?.Title || '', Validators.required],
      Slug: [this.selectedSample?.Slug || '', Validators.required],
      keywords: [this.selectedSample?.MetaKeyword || '', Validators.required],
      metaTitle: [this.selectedSample?.MetaTitle || '', Validators.required],
      metaDescription: [this.selectedSample?.MetaDescription || '', Validators.required],
      price: [this.selectedSample?.Price || '', Validators.required],
      discount: [this.selectedSample?.DiscountPrice || '', Validators.required],
      description: [this.selectedSample?.Description || '', Validators.required],
      researchId: [this.selectedSample?.researchId || '', Validators.required] // Add researchId field
    });
  }

  fetchDissertationTopics(): void {
    this.servicesService.getAllTopic().subscribe(res => {
      this.topics = res;
    });
  }

  submitForm(flag: string): void {
    if (this.samplesForm.invalid) {
      return;
    }
    const payload = {
      Title: this.samplesForm.value?.Title,
      Slug: this.samplesForm.value?.Slug,
      Description: this.samplesForm.value?.description,
      MetaTitle: this.samplesForm.value?.metaTitle,
      MetaKeyword: this.samplesForm.value?.keywords,
      MetaDescription: this.samplesForm.value?.metaDescription,
      Price: this.samplesForm.value?.price,
      DiscountPrice: this.samplesForm.value?.discount,
      researchId: this.samplesForm.value?.researchId // Include researchId in payload
    };
    if (flag === 'add') {
      this.samplesService.create(payload).subscribe(() => {
        this.close.emit();
      });
    } else {
      this.samplesService.update(payload, this.selectedSample.Id).subscribe(() => {
        this.close.emit();
      });
    }
  }

  closeForm(): void {
    this.close.emit();
  }
}


























// import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AngularEditorConfig } from '@kolkov/angular-editor';
// import { SamplesService } from 'src/app/services/samples.service';
// import { ServicesService } from 'src/app/services/services.service';
// import { BASEURL } from 'src/globals';

// @Component({
//   selector: 'app-admin-samples-form',
//   templateUrl: './admin-samples-form.component.html',
//   styleUrls: ['./admin-samples-form.component.css']
// })
// export class AdminSamplesFormComponent implements OnInit {
//   @Input() selectedSample: any; // Receive the selected sample data
//   @Output() close = new EventEmitter<void>();
//   samplesForm!: FormGroup;
//   topics: any = [];

//   editorConfig: AngularEditorConfig = {
//     editable: true,
//     spellcheck: true,
//     height: '20rem',
//     minHeight: '5rem',
//     width: 'auto',
//     minWidth: '0',
//     translate: 'yes',
//     enableToolbar: true,
//     showToolbar: true,
//     placeholder: 'Enter text here...',
//     uploadUrl: `${BASEURL}/upload/fileuploadAdmin`,
//     customClasses: [],
//     fonts: [
//       { class: 'arial', name: 'Arial' },
//       { class: 'times-new-roman', name: 'Times New Roman' },
//       { class: 'calibri', name: 'Calibri' },
//       { class: 'comic-sans-ms', name: 'Comic Sans MS' },
//     ]
//   };

//   constructor(private formBuilder: FormBuilder, private samplesService: SamplesService, private servicesService: ServicesService) {}

//   ngOnInit(): void {
//     this.generateForm();
//   }

//   ngOnChanges(): void {
//     this.generateForm(); // Regenerate the form whenever selectedSample changes
//   }

//   generateForm(): void {
//     this.samplesForm = this.formBuilder.group({
//       Title: [this.selectedSample?.Title || '', Validators.required],
//       Slug: [this.selectedSample?.Slug || '', Validators.required],
//       keywords: [this.selectedSample?.MetaKeyword || '', Validators.required],
//       metaTitle: [this.selectedSample?.MetaTitle || '', Validators.required],
//       metaDescription: [this.selectedSample?.MetaDescription || '', Validators.required],
//       price: [this.selectedSample?.Price || '', Validators.required],
//       discount: [this.selectedSample?.DiscountPrice || '', Validators.required],
//       description: [this.selectedSample?.Description || '', Validators.required],
//     });
//   }

//   fetchDissertationTopics(): void {
//     this.servicesService.getAllTopic().subscribe(res => {
//       this.topics = res;
//     })
//   }

//   submitForm(flag: string): void {
//     if (this.samplesForm.invalid) {
//       return;
//     }
//     const payload = {
//       Title: this.samplesForm.value?.Title,
//       Slug: this.samplesForm.value?.Slug,
//       Description: this.samplesForm.value?.description,
//       MetaTitle: this.samplesForm.value?.metaTitle,
//       MetaKeyword: this.samplesForm.value?.keywords,
//       MetaDescription: this.samplesForm.value?.metaDescription,
//       Price: this.samplesForm.value?.price,
//       DiscountPrice: this.samplesForm.value?.discount,
//     };
//     if (flag === 'add') {
//       this.samplesService.create(payload).subscribe(() => {
//         this.close.emit();
//       });
//     } else {
//       this.samplesService.update(payload, this.selectedSample.Id).subscribe(() => {
//         this.close.emit();
//       });
//     }
//   }

//   closeForm(): void {
//     this.close.emit();
//   }
// }
