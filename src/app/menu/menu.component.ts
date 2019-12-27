import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PubsubService } from '../pubsub.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import {Constants} from '../names.constants';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {

  constructor(private router: Router, private pubsub: PubsubService) { }
  searchTerm = '';
  searchControl = new FormControl();
  formCtrlSub: Subscription;
  searchSub: Subscription;
  searchStatus = true;
  ngOnInit() {
    this.pubsub.$pub(Constants.SEARCH_STATUS, true)
    this.formCtrlSub = this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(newValue => {
        this.searchTerm = newValue;
        this.handleSearchClick(this.searchTerm);
      });
    this.searchSub = this.pubsub.$sub(Constants.SEARCH_STATUS, data=>{
      this.searchStatus = data;
    })
  }

  handleSearchClick(event){
    this.pubsub.$pub(Constants.SEARCH_STATUS, {
      searchTerm: event
    })
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
    this.searchSub && this.searchSub.unsubscribe();
  }
}
