import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/services/services.service';
import { BASEURL } from 'src/globals';

@Component({
  selector: 'app-admin-blogs',
  templateUrl: './admin-blogs.component.html',
  styleUrls: ['./admin-blogs.component.css']
})
export class AdminBlogsComponent implements OnInit {
  blogs: any[] = [];
  servicesForm!: FormGroup;
  addService: boolean = false;
  selectedBlogs: any;
  selectedFile: File | null = null; // To store selected file
  imagePreview: string | ArrayBuffer | null = null; // To store image preview
  tagOptions: string[] = ['Business', 'Finance']; // Initial tag options

  constructor(private formBuilder: FormBuilder, private serviceService: ServicesService) {}

  ngOnInit(): void {
    this.getServices();
    this.generateForm();
  }

  getServices(): void {
    this.serviceService.getAllBlogs().subscribe((res: any) => {
      console.log(res.data, "====res.datares.data");
      this.blogs = res.data;
    });
  }

  showAddService(service?: any): void {
    this.selectedBlogs = service;
    this.generateForm();
    this.addService = !this.addService;

    // Reset image preview when editing an existing blog
    this.imagePreview = null; 
  }

  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      // Ensure selectedFile is not null before proceeding
      if (this.selectedFile) {
        // Preview the new image before upload
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(this.selectedFile);
      }
    }
  }

  submitForm(action: any): void {
    if (this.servicesForm.invalid) {
      return;
    }

    const formData = new FormData();
    formData.append('pageTilte', this.servicesForm.value?.pageTitle);
    formData.append('pageTitle', this.servicesForm.value?.pageTilte);
    formData.append('pageSlug', this.servicesForm.value?.pageSlug);
    formData.append('shortDescription', this.servicesForm.value?.shortDescription); // Adding shortDescription
    formData.append('tagLine', this.servicesForm.value?.tagLine); // Adding tagLine
    formData.append('pageDescription', this.servicesForm.value?.description);
    formData.append('metaKeyWord', this.servicesForm.value?.keywords);
    formData.append('metaDescription', this.servicesForm.value?.metaDescription);

    // Append image file if selected
    if (this.selectedFile) {
      formData.append('images', this.selectedFile, this.selectedFile.name);
    } else if (this.selectedBlogs?.images) {
      formData.append('existingImage', this.selectedBlogs.images[0]); // If editing and no new image selected
    }

    if (action === 'add') {
      this.serviceService.createBlog(formData).subscribe((res: any) => {
        console.log(res, "====Blog:addOrUpdateddddd");

        if (res.data) {
          this.addService = !this.addService;
          this.selectedBlogs = null;
          this.selectedFile = null; // Reset file input
          this.imagePreview = null; // Reset image preview
          this.getServices(); // Refresh the list after add
        }
      });
    } else {
      this.serviceService.updateBlog(formData, this.selectedBlogs.pagesID).subscribe((res: any) => {
        console.log(res, "====Blog:addOrUpdateddddd");

        if (res.status) {
          this.addService = !this.addService;
          this.selectedBlogs = null;
          this.selectedFile = null; // Reset file input
          this.imagePreview = null; // Reset image preview
          this.getServices(); // Refresh the list after update
        }
      });
    }
  }

  generateForm(): void {
    this.servicesForm = this.formBuilder.group({
      pageTitle: [this.selectedBlogs ? this.selectedBlogs.pageTilte : '', Validators.required],
      pageSlug: [this.selectedBlogs ? this.selectedBlogs.pageSlug : '', [Validators.required]],
      keywords: [this.selectedBlogs ? this.selectedBlogs.metaKeyWord : '', Validators.required],
      metaDescription: [this.selectedBlogs ? this.selectedBlogs.metaDescription : '', Validators.required],
      description: [this.selectedBlogs ? this.selectedBlogs.pageDescription : '', Validators.required],
      shortDescription: [this.selectedBlogs ? this.selectedBlogs.shortDescription : '', Validators.required],
      tagLine: [this.selectedBlogs ? this.selectedBlogs.tagLine : '', Validators.required]
    });
  }

  deleteService(id: number): void {
    this.serviceService.deleteBlog(id).subscribe(res => {
      console.log(res);
      this.getServices(); // Refresh the list after delete
    });
  }

  // Method to get image URL for displaying existing images
  getImageUrl(imageName: string): string {
    return `${BASEURL}files/${imageName}`; // Replace with your backend image path
  }
}





















// import { Component, OnInit } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ServicesService } from 'src/app/services/services.service';
// import { BASEURL } from 'src/globals';

// @Component({
//   selector: 'app-admin-blogs',
//   templateUrl: './admin-blogs.component.html',
//   styleUrls: ['./admin-blogs.component.css']
// })
// export class AdminBlogsComponent implements OnInit {
//   blogs: any[] = [];
//   servicesForm!: FormGroup;
//   addService: boolean = false;
//   selectedBlogs: any;
//   selectedFile: File | null = null; // To store selected file
//   tagOptions: string[] = ['Business', 'Finance']; // Initial tag options

//   constructor(private formBuilder: FormBuilder, private serviceService: ServicesService) {}

//   ngOnInit(): void {
//     this.getServices();
//     this.generateForm();
//   }

//   getServices(): void {
//     this.serviceService.getAllBlogs().subscribe((res: any) => {
//       console.log(res.data, "====res.datares.data");
//       this.blogs = res.data;
//     });
//   }

//   showAddService(service?: any): void {
//     this.selectedBlogs = service;
//     this.generateForm();
//     this.addService = !this.addService;
//   }

//   onFileChange(event: any): void {
//     if (event.target.files.length > 0) {
//       this.selectedFile = event.target.files[0];
//       // Optional: Display preview or perform other actions
//     }
//   }

//   submitForm(action: any): void {
//     if (this.servicesForm.invalid) {
//       return;
//     }

//     const formData = new FormData();
//     formData.append('pageTilte', this.servicesForm.value?.pageTitle);
//     formData.append('pageTitle', this.servicesForm.value?.pageTilte);
//     formData.append('pageSlug', this.servicesForm.value?.pageSlug);
//     formData.append('shortDescription', this.servicesForm.value?.shortDescription); // Adding shortDescription
//     formData.append('tagLine', this.servicesForm.value?.tagLine); // Adding tagLine
//     formData.append('pageDescription', this.servicesForm.value?.description);
//     formData.append('metaKeyWord', this.servicesForm.value?.keywords);
//     formData.append('metaDescription', this.servicesForm.value?.metaDescription);

//     // Append image file if selected
//     if (this.selectedFile) {
//       formData.append('images', this.selectedFile, this.selectedFile.name);
//     } else if (this.selectedBlogs?.images) {
//       formData.append('existingImage', this.selectedBlogs.images[0]); // If editing and no new image selected
//     }

//     if (action === 'add') {
//       this.serviceService.createBlog(formData).subscribe((res: any) => {
//         console.log(res, "====Blog:addOrUpdateddddd");

//         if (res.data) {
//           this.addService = !this.addService;
//           this.selectedBlogs = null;
//           this.selectedFile = null; // Reset file input
//           this.getServices(); // Refresh the list after add
//         }
//       });
//     } else {
//       this.serviceService.updateBlog(formData, this.selectedBlogs.pagesID).subscribe((res: any) => {
//         console.log(res, "====Blog:addOrUpdateddddd");

//         if (res.status) {
//           this.addService = !this.addService;
//           this.selectedBlogs = null;
//           this.selectedFile = null; // Reset file input
//           this.getServices(); // Refresh the list after update
//         }
//       });
//     }
//   }

//   generateForm(): void {
//     this.servicesForm = this.formBuilder.group({
//       pageTitle: [this.selectedBlogs ? this.selectedBlogs.pageTilte : '', Validators.required],
//       pageSlug: [this.selectedBlogs ? this.selectedBlogs.pageSlug : '', [Validators.required]],
//       keywords: [this.selectedBlogs ? this.selectedBlogs.metaKeyWord : '', Validators.required],
//       metaDescription: [this.selectedBlogs ? this.selectedBlogs.metaDescription : '', Validators.required],
//       description: [this.selectedBlogs ? this.selectedBlogs.pageDescription : '', Validators.required],
//       shortDescription: [this.selectedBlogs ? this.selectedBlogs.shortDescription : '', Validators.required],
//       tagLine: [this.selectedBlogs ? this.selectedBlogs.tagLine : '', Validators.required]
//     });
//   }

//   deleteService(id: number): void {
//     this.serviceService.deleteBlog(id).subscribe(res => {
//       console.log(res);
//       this.getServices(); // Refresh the list after delete
//     });
//   }

//   // Method to get image URL for displaying existing images
//   getImageUrl(imageName: string): string {
//     return `${BASEURL}files/${imageName}`; // Replace with your backend image path
//   }
// }
