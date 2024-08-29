import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { ChangeDetectorRef } from '@angular/core';
import CodeMirror from 'codemirror';

import 'codemirror/mode/xml/xml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/css/css';
import 'codemirror/mode/htmlmixed/htmlmixed';
import { BASEURL } from 'src/globals';

interface FAQs {
  id: number, 
  title: string, 
  content: string
}

@Component({
  selector: 'app-admin-editor',
  templateUrl: './admin-editor.component.html',
  styleUrls: ['./admin-editor.component.css']
})
export class AdminEditorComponent implements OnInit, AfterViewInit {
  @ViewChild('editableContent', { static: true }) editableContent!: ElementRef;
  @ViewChild('codeEditor', { static: true }) codeEditor!: ElementRef;
  editorContent: string = '';
  extraData: { [key: string]: string } = {};
  allData: any;
  imageKeys: string[] = [];
  previewImages: { [key: string]: string | ArrayBuffer | null } = {};
  selectedFiles: { [key: string]: File } = {};
  editorInstance: any;
  faqs: FAQs[] = [];

  constructor(
    private servicesService: ServicesService,
    private route: ActivatedRoute,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  parseDescription(description: string): any {
    try {
      return JSON.parse(description);
    } catch (error) {
      return description;
    }
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const data = params['data'];
      const parsedData = JSON.parse(data);

      // if(parsedData.title === 'FAQs'){
      //   this.faqs = parsedData.description;
      // }

      this.editorContent = this.parseDescription(parsedData.description);
      console.log(this.editorContent, "====this.editorContent");
      
      this.extraData = this.parseDescription(parsedData.extra_data);
      this.allData = { ...parsedData, extra_data: this.extraData };
      this.imageKeys = Object.keys(this.extraData).filter(key => key.toLowerCase().includes('image'));

      console.log(this.imageKeys, "==imageKeysimageKeysimageKeys", parsedData);
      

      // Set the initial content directly in the element
      this.editableContent.nativeElement.innerHTML = this.editorContent;      
    });
  }



  ngAfterViewInit(): void {
    this.editorInstance = CodeMirror.fromTextArea(this.codeEditor.nativeElement, {
      mode: 'htmlmixed',
      lineNumbers: true,
      theme: 'default'
    });

    this.editorInstance.setValue(this.editorContent);

    this.editorInstance.on('change', () => {
      this.editorContent = this.editorInstance.getValue();
    });
  }


  onContentChange(html: string): void {
    this.editorContent = html;
    console.log('Content updated:', this.editorContent);
  }

  getImageUrl(imageKey: string): string | ArrayBuffer | null {
    return this.previewImages[imageKey] || `${BASEURL}files/${this.extraData[imageKey]}`;
  }

  onImageSelect(event: Event, imageKey: string): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      this.selectedFiles[imageKey] = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.previewImages[imageKey] = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onTextChange(event: Event, key: string): void {
    const inputElement = event.target as HTMLInputElement;
    this.allData[key] = inputElement.value;
  }

  goBack(): void {
    this.router.navigate([`/admin/text-pages`]);
  }

  saveContent(): void {
    const formData = new FormData();
  
    // Add selected files to formData
    Object.keys(this.selectedFiles).forEach((key) => {
      formData.append(key, this.selectedFiles[key]);
    });
  
    // Add other form data fields
    formData.append('description', this.editorContent);
    formData.append('title', this.allData.title);
    formData.append('page_name', this.allData.page_name);
  
    // Serialize extra_data object and add it as a text field
    formData.append('extra_data', JSON.stringify(this.allData.extra_data));
  
    formData.forEach((value, key) => {
      console.log(`${key}:`, value);
    });
  
    this.servicesService.uploadContent(formData, this.allData.id).subscribe(
      response => {
        console.log('Content saved successfully:', response);
        alert("Successfully Updated");
      },
      error => {
        console.error('Error saving content:', error);
        alert("Error Updating Content: " + error.message);
      }
    );
  }

  saveChangesFAQs(): void {
    console.log('FAQs updated:', this.faqs);
    this.servicesService.updateMultiple(this.faqs).subscribe(
      response => {
        console.log('Content saved successfully:', response);
        alert("Successfully Updated");
      },
      error => {
        console.error('Error saving content:', error);
        alert("Error Updating Content: " + error.message);
      }
    );
  }
}
