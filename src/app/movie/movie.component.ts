import { Component, OnInit } from '@angular/core';
import { MovieService } from '../movie.service';
import { PubsubService } from '../pubsub.service';
import { IMOVIE } from './movie.interface';
import { Router } from '@angular/router';


@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.scss']
})
export class MovieComponent implements OnInit {
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  movies: IMOVIE[] = [];
  page=1;

  constructor(
    private movieService: MovieService,
    private pubsub: PubsubService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initListeners();
    this.movieService.getAllMovies(this.page, 20).subscribe(data=>{
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

  showMovieDetails(id){
    this.router.navigate(['details', id]);
  }


  onPageChange(e) {
    console.log("page changed")
    this.movieService.getAllMovies(this.page, 20).subscribe(data=>{
      console.log(data);
      this.movies = data;
    }, error=>{
      console.log(error);
    });
  }
}
