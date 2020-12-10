import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd} from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts;
  visible;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        console.log(event.url)
        if (event.url === '/') {
          this.visible = true;
        } else {
          this.visible = false;
        }
      }
    })
  }
  incomingPosts($event) {
    this.posts = $event;
    console.log(this.posts);
  }


}
