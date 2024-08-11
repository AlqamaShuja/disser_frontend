import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ServicesService } from '../services/services.service';

interface TopicList {
  id: number,
  title: string,
  price: string,
  description: string,
  createdAt: string,
  updatedAt: string,
}

@Component({
  selector: 'app-sample-topic-list',
  templateUrl: './sample-topic-list.component.html',
  styleUrls: ['./sample-topic-list.component.css']
})
export class SampleTopicListComponent implements OnInit {
  topics: TopicList[] = [];

  @Output() topicSelected: EventEmitter<TopicList> = new EventEmitter();

  constructor(private serviceService: ServicesService) { }

  ngOnInit(): void {
    this.serviceService.getAllTopic().subscribe((res) => {
      console.log(res, "===res:topicsList");
      this.topics = [{ id: 0, title: 'All Dissertation Samples', price: 0, description: 'All Dissertation Topic', createdAt: 'no', updatedAt: 'no' }, ...res];
    });
  }

  onSelectTopic(topic: TopicList): void {
    this.topicSelected.emit(topic);
  }
}















// import { Component, OnInit } from '@angular/core';
// import { ServicesService } from '../services/services.service';

// interface TopicList {
//   id: number,
//   title: string,
//   price: string,
//   description: string,
//   createdAt: string,
//   updatedAt: string,
// }


// @Component({
//   selector: 'app-sample-topic-list',
//   templateUrl: './sample-topic-list.component.html',
//   styleUrls: ['./sample-topic-list.component.css']
// })
// export class SampleTopicListComponent implements OnInit {
//   topics: TopicList[] = [];

//   constructor(private serviceService: ServicesService) { }

//   ngOnInit(): void {
//     this.serviceService.getAllTopic().subscribe((res) => {
//       console.log(res, "===res:topicsList");
      
//       this.topics = res;
//     });
//   }
// }
