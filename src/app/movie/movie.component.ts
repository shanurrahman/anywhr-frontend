import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { PubsubService } from '../pubsub.service';
import { IMOVIE } from './movie.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscription } from 'rxjs';
import { FormControl } from '@angular/forms';
import {Constants} from '../names.constants';
import CommonFormatter from '../common';



@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit, OnDestroy {
  movies: IMOVIE[] = [];
  page = 1;
  collectionSize = 50;
  movieSubscription: Subscription;
  suggestedSubs: Subscription;
  pbsb: Subscription;


  /**
   *Creates an instance of MovieComponent.
   * @param {MovieService} movieService
   * @param {PubsubService} pubsub
   * @param {Router} router
   * @param {NgxSpinnerService} spinner
   * @memberof MovieComponent
   */
  constructor(
    private movieService: MovieService,
    private pubsub: PubsubService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }



  /**
   *
   *
   * @memberof MovieComponent
   */
  firstNameControl = new FormControl();


  /**
   *
   *
   * @type {Subscription}
   * @memberof MovieComponent
   */
  formCtrlSub: Subscription;


  /**
   *
   *
   * @memberof MovieComponent
   */
  ngOnInit() {
    this.pubsub.$pub(Constants.SEARCH_STATUS, true)
    this.initListeners();
    this.spinner.show();
    this.movieSubscription = this.movieService.getAllMovies(this.page, 20).subscribe((result: any) => {
      this.spinner.hide();
      this.movies = result.data;
      CommonFormatter.formatAllMovies(this.movies);
      this.collectionSize = result.total;
    }, error => {
      this.spinner.hide();
      alert("Error occured")
    });
  }

  /** Initializes all listeners in this component */
  initListeners() {
    this.pbsb = this.pubsub.$sub(Constants.SEARCH, data => {
      console.log(data)
      this.showSuggestedMovies(data.searchTerm);
    });
  }



  /**
   *
   *
   * @param {string} title
   * @memberof MovieComponent
   */
  showMovieDetails(title: string) {
    console.log(title);
    this.router.navigate(['/movie'], { queryParams: { title } });
  }

  /** Retrives a list of movies based on what was entered in the search box */
  showSuggestedMovies(searchTerm) {
    this.spinner.show();
    this.movieService.getSuggestedMovies(searchTerm).subscribe((result: any)=>{
      this.spinner.hide();
      this.movies = result.data;
      this.collectionSize = result.total;
    }, error=>{
      this.spinner.hide();
    })
  }


  /**
   *
   * binds to a pagination hook and then retrives data from the backend
   * @param {*} e
   * @memberof MovieComponent
   */
  onPageChange(e) {
    this.spinner.show();
    this.suggestedSubs = this.movieService.getAllMovies(this.page, 20).subscribe((result :any)=> {
      this.spinner.hide();
      this.movies = result.data;
      this.collectionSize = result.total;
    }, error => {
      this.spinner.hide();
      console.log(error);
    });
  }


  /** Removes subscription to prevent memory leaks */
  ngOnDestroy(){
    this.movieSubscription && this.movieSubscription.unsubscribe();
    this.suggestedSubs && this.suggestedSubs.unsubscribe();
    this.pbsb && this.pbsb.unsubscribe();
  }
}
