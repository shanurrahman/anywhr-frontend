import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieService } from '../movie.service';
import { IMOVIE } from '../movie/movie.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) { }

  movie: IMOVIE[] = []
  id: string;
  orderObj: any;
  loadMovieSub: Subscription;
  loadByTitleSub: Subscription;
  title: string;
  ngOnInit() {
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
    this.loadByTitleSub = this.movieService.getMovieByTitle(title).subscribe(data => {
      console.log(data);
      this.movie = data;
    }, error => {
      console.log(error);
    })
  }

  ngOnDestroy() {
    this.loadMovieSub && this.loadMovieSub.unsubscribe();
    this.loadByTitleSub && this.loadByTitleSub.unsubscribe();
  }
}
