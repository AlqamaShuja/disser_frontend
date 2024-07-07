import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-update-order',
  templateUrl: './update-order.component.html',
  styleUrls: ['./update-order.component.css'],
})
export class UpdateOrderComponent implements OnInit {
  @Input()
  selectedOrderForDetails: any;
  updateOrderForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private orderService:OrderService) {
  }

  ngOnInit(): void {
    this.updateOrderForm = this.formBuilder.group({
      email: [this.selectedOrderForDetails?this.selectedOrderForDetails.Email:''],
      farmaish: [this.selectedOrderForDetails?this.selectedOrderForDetails.farmaish:''],
      page_words: [this.selectedOrderForDetails?this.selectedOrderForDetails.NumberOfWordsPages:''],
      your_topic: [this.selectedOrderForDetails?this.selectedOrderForDetails.TopicCategory:''],
      detail_instructions: [this.selectedOrderForDetails?this.selectedOrderForDetails.DetailInstructions:''],
      writing_service: [this.selectedOrderForDetails?this.selectedOrderForDetails.TypeofWritingService:''],
      help_require: [this.selectedOrderForDetails?this.selectedOrderForDetails.TypeofHelpRequire:''],
      line_space: [this.selectedOrderForDetails?this.selectedOrderForDetails.LineSpacing:''],
      soft_service: [this.selectedOrderForDetails?this.selectedOrderForDetails.SoftwareService:''],
      topic: [this.selectedOrderForDetails?this.selectedOrderForDetails.Topic:''],
      pre_slide: [this.selectedOrderForDetails?this.selectedOrderForDetails.PresentationSlides:''],
      sources_ref: [this.selectedOrderForDetails?this.selectedOrderForDetails.SourceReferences:''],
      writing_style: [this.selectedOrderForDetails?this.selectedOrderForDetails.WritingStyle:''],
      language_style: [this.selectedOrderForDetails?this.selectedOrderForDetails.PreferredLanguageLevel:''],
      edu_level: [this.selectedOrderForDetails?this.selectedOrderForDetails.EducationLevel:''],
      paper_stnd: [this.selectedOrderForDetails?this.selectedOrderForDetails.PaperStandard:''],
      deadline: [this.selectedOrderForDetails?this.selectedOrderForDetails.DeadLine:''],
      price: [this.selectedOrderForDetails?this.selectedOrderForDetails.BeforeDiscount:''],
      dCode: [this.selectedOrderForDetails?this.selectedOrderForDetails.DiscountCode:''],
      gamount: [this.selectedOrderForDetails?this.selectedOrderForDetails.BeforeDiscount:''],
      id: [this.selectedOrderForDetails?this.selectedOrderForDetails.Id:''],
    });
  }

  updateOrder():void{
    this.orderService.updateOrderDetails(this.updateOrderForm.value).subscribe((res:any)=>{
      if(res.data){
        window.location.href = '/admin/orders';
      }
    })
  }
}
