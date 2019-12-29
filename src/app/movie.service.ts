import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // this will come from the environment file
  apiURL: string = environment.url;


  /**
   *Creates an instance of MovieService.
   * @param {HttpClient} http
   * @memberof MovieService
   */
  constructor(
    private http: HttpClient
  ) { }

  /**  @Todo remove any after defining types
   * Also send pagination data
  */
  /**
   *
   *
   * @param {number} [page=1]
   * @param {number} [perPage=20]
   * @returns
   * @memberof MovieService
   */
  public getAllMovies(page: number = 1, perPage: number = 20) {
    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any[]>(`${this.apiURL}/movies?page=${page}&perPage=${perPage}`);
  }


  /**
   *
   *
   * @param {number} id
   * @returns
   * @memberof MovieService
   */
  public getMovieById(id: number) {
    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any>(`${this.apiURL}/movies/${id}`);
  }


  /**
   *
   *
   * @param {string} title
   * @returns
   * @memberof MovieService
   */
  public getMovieByTitle(title: string) {
    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any>(`${this.apiURL}/movies?title=${title}`);
  }


  /**
   *
   *
   * @param {string} searchTerm
   * @returns
   * @memberof MovieService
   */
  public getSuggestedMovies(searchTerm: string) {
    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any>(`${this.apiURL}/movies/suggest?title=${searchTerm}`);
  }


  /**
   *
   *
   * @param {string} title
   * @returns
   * @memberof MovieService
   */
  public getMovieShootingLocations(title: string) {
    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any>(`${this.apiURL}/movies/shotLocation?title=${title}`);
  }


  /**
   *
   *
   * @param {string} term
   * @returns
   * @memberof MovieService
   */
  public wikiSearch(term: string) {
    let url = 'https://en.wikipedia.org/w/api.php';

    const params = {
      action: 'query',
      list: 'search',
      srsearch: 'Nelson Mandela',
      format: 'json'
    };

    console.log("term received", term)
    params.srsearch = term;
    url = url + '?origin=*';
    Object.keys(params).forEach((key) => { url += '&' + key + '=' + params[key]; });

    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any>(url);
  }


  // Movies db integration here
  // public moviesdbapiListSearch(searchTerm) {
  //   console.log(environment);
  //   return this.http.get(`https://api.themoviedb.org/3/search/movie?api_key=${environment.moviesdbKey}&query=${searchTerm}`)
  // }

  // public moviesdbDetailSearch(movieId) {
  //   console.log(environment);
  //   return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${environment.moviesdbKey}`)
  // }
}
