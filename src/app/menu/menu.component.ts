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


  /**
   *Creates an instance of MenuComponent.
   * @param {Router} router
   * @param {PubsubService} pubsub
   * @memberof MenuComponent
   */
  constructor(private router: Router, private pubsub: PubsubService) { }
  searchTerm = '';
  searchControl = new FormControl();
  /** Keeps track of any value that changes, we then publish it in an event
   * called Constants.Search
   */
  formCtrlSub: Subscription;
  /** To reomve subscription once component gets destroyed */
  searchSub: Subscription;

  /** Whether or not to show the search bar */
  searchStatus = true;
  ngOnInit() {
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

  /** To publish SEARCH event from our mennu component to all the subscribers */
  handleSearchClick(event){
    this.pubsub.$pub(Constants.SEARCH, {
      searchTerm: event
    })
  }

  /** House keeping stuff here */
  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
    this.searchSub && this.searchSub.unsubscribe();
  }
}
