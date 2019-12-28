import { IMOVIE } from './movie/movie.interface';

export class CommonFormatter {

  joinValues(value) {
    return value.split('|').join(' | ');
  }

  formatMovie (movie: IMOVIE) {
    if(movie.locations && movie.locations.length === 1) {
      movie.locations = movie.locations[0].split('|');
    }

    Object.keys(movie).forEach(key=>{
      console.log(key);
      if(key!='locations' && movie[key]) {
        movie[key] = this.joinValues(movie[key])
      }
    })
    return movie;
  }

  formatAllMovies(movies: IMOVIE[]) {
    movies.forEach((movie: IMOVIE)=> {
      movie = this.formatMovie(movie);
    })

    return movies;
  }
}

export default new CommonFormatter();


