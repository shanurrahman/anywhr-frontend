import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { PubsubService } from '../pubsub.service';
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


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
  ngOnInit() {
    this.formCtrlSub = this.searchControl.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe(newValue => {
        this.searchTerm = newValue;
        this.handleSearchClick(this.searchTerm);
      });
  }

  handleSearchClick(event){
    this.pubsub.$pub('search', {
      searchTerm: event
    })
  }

  ngOnDestroy() {
    this.formCtrlSub.unsubscribe();
  }
}
