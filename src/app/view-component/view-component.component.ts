import { Component, OnInit, AfterViewChecked, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BlogCard } from '../blog-card/blogCard';
@Component({
  selector: 'app-view-component',
  templateUrl: './view-component.component.html',
  styleUrls: ['./view-component.component.css']
})
export class ViewComponent implements OnInit, AfterViewChecked{
  post;
  constructor(private activatedRoute: ActivatedRoute, private http: HttpClient) { }

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
    this.activatedRoute.params.subscribe((params: Params) => {
      const id = params['id'];
      if (id !== undefined) {
        this.http.get<BlogCard>(`/post/${id}`)
        .subscribe((post) => {
          this.post = post;
          console.log(this.post);
        })
      }
    })
  }

  ngAfterViewChecked() {
    this.setBackground();
  }

}
