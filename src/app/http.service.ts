import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BlogCard } from './blog-card/blogCard';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable()
export class HttpService {
  posts;
  constructor(private http: HttpClient) {
  }
  
  getPosts(cb) {
    this.http.get<BlogCard>('/posts')
    .subscribe((posts) => {
      cb(posts);
    });
  }

  addPost(title, text, date, cb) {
    this.http.post('/add', {
      // tslint:disable-next-line:object-literal-shorthand
      title: title,
      // tslint:disable-next-line:object-literal-shorthand
      text: text,
      // tslint:disable-next-line:object-literal-shorthand
      date: date
    }, httpOptions)
    .subscribe(cb());
  }
}
