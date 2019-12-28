import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { IMOVIE } from '../movie/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import {get} from 'lodash';
import { PubsubService } from '../pubsub.service';
import {Constants} from '../names.constants'
import { isArray } from 'util';
import CommonFormatter from '../common';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private pubsub: PubsubService
  ) { }

  movie: IMOVIE
  id: string;
  orderObj: any;
  loadMovieSub: Subscription;
  loadByTitleSub: Subscription;
  title: string;
  more = ''
  contentLoading = false;
  ngOnInit() {
    this.pubsub.$pub(Constants.SEARCH_STATUS, false);
    this.activatedRoute
      .queryParams
      .subscribe(params => {
        this.title = params.title || '';
        this.loadMovieData(this.title);
      }, error=>{
        console.log(error.message);
      });
  }


  loadMovieData(title) {
    this.spinner.show();
    this.loadByTitleSub = this.movieService.getMovieShootingLocations(title).subscribe(data => {
      console.log(data);
      this.spinner.hide();
      this.movie = data;
      this.movie = CommonFormatter.formatMovie(this.movie);
    }, error => {
      this.spinner.hide();
      console.log(error);
    })

    // Movies Db Integration here
    // this.movieService.moviesdbapiListSearch(title).subscribe((data: any)=>{
    //   this.movieService.moviesdbDetailSearch(data.results[0].id).subscribe((result: any)=>{
    //     console.log(result);
    //   })
    // }, error=>{
    //   console.log(error);
    // })
  }

  wikiSearch(event) {
    this.more = ""
    let searchTerm = event.target.innerHTML.trim();
    this.contentLoading = true;
    this.movieService.wikiSearch(searchTerm).subscribe(res=>{
      this.contentLoading=false;
      let data = get(res, 'query.search', 'Wiki server buzy');
      if(!isArray(data)){
        console.log(res);
        this.more=res.error.info;
      }else{
        data.forEach(element => {
          this.more+=element.snippet;
          this.more+="</br>"
        });
      }
    }, error=>{
      this.contentLoading = false;
    })
  }

  ngOnDestroy() {
    this.loadMovieSub && this.loadMovieSub.unsubscribe();
    this.loadByTitleSub && this.loadByTitleSub.unsubscribe();
  }
}
