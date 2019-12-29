import { IMOVIE } from './movie/movie.interface';

export class CommonFormatter {


  /**
   *
   *
   * @param {*} value
   * @returns
   * @memberof CommonFormatter
   */
  joinValues(value) {
    if(!value) {
      return;
    }
    return value.split('|').join(' | ');
  }


  /**
   *
   *
   * @param {IMOVIE} movie
   * @returns
   * @memberof CommonFormatter
   */
  formatMovie (movie: IMOVIE) {
    if(!movie) {
      return;
    }

    if(movie.locations && movie.locations.length === 1) {
      if(movie.locations[0].indexOf('|')>=0) {
        movie.locations = movie.locations[0] && movie.locations[0].split('|');
      }
    }

    Object.keys(movie).forEach(key=>{
      console.log(key);
      if(key!='locations' && movie[key]) {
        movie[key] = this.joinValues(movie[key])
      }
    })
    return movie;
  }


  /**
   *
   *
   * @param {IMOVIE[]} movies
   * @returns
   * @memberof CommonFormatter
   */
  formatAllMovies(movies: IMOVIE[]) {
    movies.forEach((movie: IMOVIE)=> {
      movie = this.formatMovie(movie);
    })

    return movies;
  }
}

export default new CommonFormatter();


