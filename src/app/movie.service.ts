import { Injectable } from '@angular/core';
import { Observable, of} from 'rxjs';
import { Page } from './page';
import { Genre } from './genre';
import { GenreList } from './genre_list';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

	private movieUrl
	= "https://api.themoviedb.org/3/movie/now_playing?api_key=c2df4eacc66954cca97fa630684ae90b&language=en-US&&page=1";
	private genreUrl
	= "https://api.themoviedb.org/3/genre/movie/list?api_key=c2df4eacc66954cca97fa630684ae90b&language=en-US"

	getMovies(): Observable<Page> {
		return this.http.get<Page>(this.movieUrl);
	}

	getGenres(): Observable<GenreList> {
		return this.http.get<GenreList>(this.genreUrl);
	}

  constructor(
	  private http: HttpClient
  ) { }
}
