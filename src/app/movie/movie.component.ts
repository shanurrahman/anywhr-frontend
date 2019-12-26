import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { PubsubService } from '../pubsub.service';
import { IMOVIE } from './movie.interface';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";
import { Subscribable, Subscription } from 'rxjs';


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

  constructor(
    private movieService: MovieService,
    private pubsub: PubsubService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.initListeners();
    this.spinner.show();
    this.movieSubscription = this.movieService.getAllMovies(this.page, 20).subscribe((result: any) => {
      this.spinner.hide();
      this.movies = result.data;
      this.collectionSize = result.total;
    }, error => {
      this.spinner.hide();
      alert("Error occured")
    })
  }

  initListeners() {
    this.pbsb = this.pubsub.$sub('search', data => {
      console.log(data);
      this.showSuggestedMovies(data.searchTerm);
    });
  }

  showMovieDetails(title) {
    console.log(title);
    this.router.navigate(['/movie'], { queryParams: { title } });
  }

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

  onPageChange(e) {
    console.log("page changed");
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

  ngOnDestroy(){
    this.movieSubscription && this.movieSubscription.unsubscribe();
    this.suggestedSubs && this.suggestedSubs.unsubscribe();
    this.pbsb && this.pbsb.unsubscribe();
  }
}
