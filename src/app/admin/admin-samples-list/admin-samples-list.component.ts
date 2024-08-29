import { Component, EventEmitter, Output } from '@angular/core';
import { SamplesService } from 'src/app/services/samples.service';

@Component({
  selector: 'app-admin-samples-list',
  templateUrl: './admin-samples-list.component.html',
  styleUrls: ['./admin-samples-list.component.css']
})
export class AdminSamplesListComponent {
  @Output() addSample = new EventEmitter<string>();
  @Output() editSample = new EventEmitter<any>();
  samples: any[] = [];
  displayData: any[] = [];
  chunkedArray: any;
  currentPage: number = 1;
  noOfPages: number = 1;
  searchKey: string = "";
  selectedSample: any; // To hold the sample selected for deletion
  isDeleteModalVisible: boolean = false; // To control the visibility of the delete modal

  constructor(private samplesService: SamplesService) {}

  ngOnInit(): void {
    this.getSamples();
  }

  getSamples(): void {
    this.samplesService.getSamples().subscribe((res: any) => {
      console.log(res.data, "=======res:daataaaaaaa",);
      this.samples = res.data;
      this.chunkedArray = this.chunkArray(res.data, 25);
      this.displayData = this.chunkedArray[0];
      this.noOfPages = Math.ceil(res.data.length / 25);
    });
  }

  onClickAddSamples(slug?: string): void {
    this.addSample.emit(slug);
  }

  onClickEditSample(sample: any): void {
    this.editSample.emit(sample);
  }

  openDeleteModal(sample: any): void {
    this.selectedSample = sample; // Set the sample to be deleted
    this.isDeleteModalVisible = true; // Show the modal
  }

  hideDeleteModal(): void {
    this.isDeleteModalVisible = false; // Hide the modal
  }

  confirmDelete(): void {
    this.deleteSample(this.selectedSample.id); // Call delete function with the selected sample id
    this.hideDeleteModal(); // Close the modal after confirming deletion
  }

  deleteSample(id: number): void {
    this.samplesService.delete(id).subscribe(() => {
      this.getSamples(); // Refresh the list after deletion
      alert("Sample deleted successfully.");
    });
  }

  chunkArray(array: any[], chunkSize: number): any[][] {
    const chunks = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      chunks.push(array.slice(i, i + chunkSize));
    }
    return chunks;
  }

  onSearch(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.displayData = this.samples.filter(element => element?.Title?.includes(this.searchKey) || element.Slug.includes(this.searchKey));
    } else if (event.key === 'Backspace' && this.searchKey === '') {
      this.displayData = this.samples;
    }
  }

  getRange(n: number): number[] {
    return Array.from({ length: n }, (_, index) => index);
  }

  changePage(page: number): void {
    if (page > 0 && page <= this.noOfPages) {
      this.displayData = this.chunkedArray[page - 1];
      this.currentPage = page;
    }
  }
}
