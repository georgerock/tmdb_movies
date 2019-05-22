import { Component, OnInit, Input } from '@angular/core';
import { Page } from '../page';
import { Movie } from '../movie';
import { Genre } from '../genre';
import { GenreList } from '../genre_list';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  private moviePage: Page = new Page();
  private displayableMovies: Movie[] = new Array();
  private genresList: GenreList = new GenreList();
  private imageUrl = "https://image.tmdb.org/t/p/w200";
  private inputRange = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5,
  						7, 7.5, 8, 8.5, 9, 9.5, 10];
  private minRating = 3;

  generateGenre(id: number): string {
	  let genre = this.genresList.genres.filter(gn => id === gn.id);
	  return " " + genre[0].name;
  };

  addGenreToMovies(movies: Movie[]): Movie[] {
	  return movies.map(movie => {
		  movie.genres = movie.genre_ids.map(id => this.generateGenre(id));
		  return movie;
	  });
  };

  filterByMinimumRating(movies: Movie[]): Movie[] {
	  return movies.filter(movie => movie.vote_average >= this.minRating);
  };

  getMovies(): void {
	  this.movieService.getMovies()
	  	.subscribe((page: Page) => {
			page.results.sort((a, b) =>
			(a.popularity < b.popularity) ? 1 :
									((b.popularity < a.popularity) ? -1 :0));

			page.results = this.addGenreToMovies(page.results);

			this.moviePage = page;
			this.displayableMovies =
				this.filterByMinimumRating(this.moviePage.results);
		}
	);
  }

  getGenres(): void {
	  this.movieService.getGenres()
        .subscribe((genresList: GenreList) => {
			this.genresList = genresList;
			this.getMovies();
		}
	);
  }

  handleInputChanged(): void {
	  this.displayableMovies =
	  		this.filterByMinimumRating(this.moviePage.results);
  }

  constructor(private movieService: MovieService) { }

  ngOnInit() {
	  this.getGenres();
  }

}
