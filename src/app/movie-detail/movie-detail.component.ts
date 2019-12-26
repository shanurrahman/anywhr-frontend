import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { IMOVIE } from '../movie/movie.interface';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit {

  constructor(
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) { }

  movie: IMOVIE[] = []
  id: string;
  orderObj: any;
  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      this.orderObj = {...params.keys, ...params};
      console.log(this.orderObj);
    });
  }

  loadMovieData(title) {
    this.movieService.getMovieByTitle(title).subscribe(data => {
      console.log(data);
      this.movie = data;
    }, error => {
      console.log(error);
    })
  }
}
