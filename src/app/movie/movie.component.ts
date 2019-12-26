import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { PubsubService } from '../pubsub.service';
import { IMOVIE } from './movie.interface';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  movies: IMOVIE[] = [];

  constructor(
    private movieService: MovieService,
    private pubsub: PubsubService
  ) { }

  ngOnInit() {
    this.initListeners();
    this.movieService.getAllMovies().subscribe(data=>{
      console.log(data);
      this.movies = data;
    }, error=>{
      // alert("Error occured")
    })
  }

  initListeners() {
    this.pubsub.$sub('search', data=>{
      console.log(data);
    })
  }
}
