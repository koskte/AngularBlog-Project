import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-add-post-button',
  templateUrl: './add-post-button.component.html',
  styleUrls: ['./add-post-button.component.css']
})
export class AddPostButtonComponent implements OnInit {
  text = '';
  title = '';
  date = '';
  @Output() event = new EventEmitter();
  constructor(private httpService: HttpService) { }
  submit() {
    this.httpService.addPost(this.title, this.text, this.date, () => {
      setTimeout(() => {
        this.httpService.getPosts((posts) => {
            this.event.emit(posts);
        });
      }, 200);
    });
  }

  ngOnInit() {
    const date = new Date();
    const formattedDate = moment(date).format('YYYY-MM-DD');
    this.date = formattedDate;
  }

}
