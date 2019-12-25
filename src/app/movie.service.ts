import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  // this will come from the environment file
  apiURL: string = environment.url;

  constructor(
    private http: HttpClient
  ) { }

  /**  @Todo remove any after defining types
   * Also send pagination data
  */
  public getAllMovies(page=1, perPage=20) {
    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any[]>(`${this.apiURL}/movies?page=${page}&perPage=${perPage}`);
  }

  public getMovieById(id) {
    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any>(`${this.apiURL}/movies/${id}`);
  }

  public getMovieByTitle(title) {
    // can use a pipe and map operator to send exactly what is required
    return this.http.get<any>(`${this.apiURL}/movies?title=${title}`);
  }
}
