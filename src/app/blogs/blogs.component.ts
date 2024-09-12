import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from '../services/services.service';
import { GlobalService } from '../services/global.service';
import { BASEURL } from 'src/globals';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  blogs: any[] = [];
  filteredBlogs: any[] = [];
  categories: string[] = [];
  latestBlogs: any[] = [];
  searchTerm: string = '';
  selectedCategory: string = '';
  selectedBlog: any = null;
  selectedFile: File | null = null; // To store the new selected file for image upload
  imagePreview: string | ArrayBuffer | null = null; // To store the preview of the selected image

  constructor(
    private serviceService: ServicesService,
    private router: Router,
    private route: ActivatedRoute,
    private globalService: GlobalService
  ) {}

  ngOnInit(): void {
    this.serviceService.getAllBlogs().subscribe((res: any) => {
      console.log(res.data, '======res:blogs');
      
      this.blogs = res.data;
      this.filteredBlogs = this.blogs; // Initialize with all blogs
      this.extractCategories();
      this.getLatestBlogs();
      this.route.queryParams.subscribe(params => {
        const slug = params['slug'];
        if (slug) {
          this.selectedBlog = this.blogs.find(blog => blog.pageSlug === slug);
          if (this.selectedBlog) {
            this.selectedBlog.pageDescription = this.decodeHtml(this.selectedBlog.pageDescription); // Decode the HTML
          }
        } else {
          this.selectedBlog = null;
        }
      });
    });
  }

  // Decode HTML entities
  decodeHtml(html: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = html;
    return textArea.value;
  }

  // Extract unique categories from blogs (tagLine)
  extractCategories(): void {
    const tags = this.blogs.map(blog => blog.tagLine).filter(tag => tag);
    this.categories = Array.from(new Set(tags));
  }

  // Filter blogs by category
  filterByCategory(category: string): void {
    this.selectedCategory = category;
    this.selectedBlog = null; // Clear selected blog
    this.filteredBlogs = this.blogs.filter(blog => blog.tagLine === category);
    this.router.navigate([], { queryParams: { slug: null }, queryParamsHandling: 'merge' });
  }

  // Handle search input changes
  onSearchChange(): void {
    this.filteredBlogs = this.blogs.filter(blog => 
      blog.pageTitle.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      blog.pageTilte.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  // Trigger search action
  onSearchClick(): void {
    this.onSearchChange();
  }

  // Show blog details and update query params
  showBlogDetails(blog: any): void {
    this.selectedBlog = blog;
    this.imagePreview = null; // Reset image preview when showing blog details
    this.router.navigate([], { queryParams: { slug: blog.pageSlug }, queryParamsHandling: 'merge' });
  }

  // Clear selection and remove query params
  clearSelection(): void {
    this.selectedBlog = null;
    this.selectedCategory = '';
    this.filteredBlogs = this.blogs;
    this.router.navigate([], { queryParams: { slug: null }, queryParamsHandling: 'merge' });
  }

  // Get latest blogs (slice to show top 3)
  getLatestBlogs(): void {
    this.latestBlogs = this.blogs.slice(0, 3);
  }

  // Construct the image URL
  getImageUrl(imageName: string): string {
    return `${BASEURL}files/${imageName}`;
  }

  // Handle file change for new image upload
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
  
      // Check if the selectedFile is not null before reading
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

  // Update blog with new image (if applicable)
  updateBlogWithNewImage(): void {
    if (!this.selectedBlog || !this.selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append('pageSlug', this.selectedBlog.pageSlug);
    formData.append('image', this.selectedFile, this.selectedFile.name);

    // Call the service to update the blog with the new image
    this.serviceService.updateBlog(formData, this.selectedBlog.pagesID).subscribe((res: any) => {
      console.log(res, "====Blog: updated with new image");
      if (res.data.affectedRows) {
        // Update the blog list after successful update
        this.getServices();
        this.clearSelection();
      }
    });
  }

  // Reload the list of blogs
  getServices(): void {
    this.serviceService.getAllBlogs().subscribe((res: any) => {
      this.blogs = res.data;
      this.filteredBlogs = this.blogs; // Reset filtered blogs
      this.extractCategories(); // Refresh categories
      this.getLatestBlogs(); // Refresh latest blogs
    });
  }
}
