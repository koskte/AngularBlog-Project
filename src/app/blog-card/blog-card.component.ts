import { Component, OnInit, AfterViewChecked, Input, OnChanges } from '@angular/core';
import { HttpService } from '../http.service';
@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css']
})
export class BlogCardComponent implements OnInit, AfterViewChecked, OnChanges {
  posts;
  @Input() incomingPosts;
  constructor(private httpService: HttpService) { }
  displayShortText(text: string): string {
    let shortText = '';
    let counter = 0;
    if (text.length > 64) {
      for (let i = 0; i < text.length; i++) {
        shortText = shortText + text.charAt(i);
        if (shortText.charAt(i) === ' ') {
          counter++;
        }
        if (counter === 20) {
          return shortText + '...';
        }
      }
    } else {
      return text;
    }
  }
  setBackground(): void {
    const cards = document.getElementsByClassName('date');
    for (let i = 0; i < cards.length; i++) {
      const month = cards.item(i).textContent.slice(6, 8);
      if (month === '01' || month === '02' || month === '12') {
        cards.item(i).parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('winter');
      } else if (month === '03' || month === '04' || month === '05') {
        cards.item(i).parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('spring');
      } else if (month === '06' || month === '07' || month === '08') {
        cards.item(i).parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('summer');
      } else if (month === '09' || month === '10' || month === '11') {
        cards.item(i).parentElement.parentElement.parentElement.parentElement.parentElement.classList.add('autumn');
      }
    }
  }
  ngOnInit() {
    this.httpService.getPosts((posts) => {
      this.posts = posts;
    });
  }
  ngAfterViewChecked(): void {
    this.setBackground();
  }
  ngOnChanges() {
    if (this.incomingPosts !== undefined) {
      this.posts = this.incomingPosts;
    }
  }
  
}
