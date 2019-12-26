import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PubsubService } from '../pubsub.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private pubsub: PubsubService) { }
  searchTerm = '';
  ngOnInit() {
  }

  handleSearchClick(event){
    console.log(event);
    this.pubsub.$pub('search', {
      searchTerm: event
    })
  }
}
