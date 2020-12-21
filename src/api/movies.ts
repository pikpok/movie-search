type MovieType = 'movie' | 'series' | 'episode';

export interface Movie {
  id: string;
  title: string;
  year: string;
  type: MovieType;
  poster: string;
}

interface ApiResponseSuccess {
  Response: "True"
  totalResults: number;
  Search: {
    Title: string;
    Year: string;
    imdbID: string;
    Type: MovieType;
    Poster: string;
  }[];
}

interface ApiResponseFailure {
  Response: "False";
  Error: string;
}

type ApiResponse = ApiResponseSuccess | ApiResponseFailure;

export function fetchMovies(query: string): Promise<Movie[]> {
  const apiKey = process.env.REACT_APP_API_KEY || '';

  return fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(query)}`)
    .then((res) => res.json())
    .then((res: ApiResponse) => {
      if (res.Response === 'True') {
        return res.Search.map((movie) => ({
          id: movie.imdbID,
          title: movie.Title,
          year: movie.Year,
          type: movie.Type,
          poster: movie.Poster,
        }));
      }

      return [];
    });
}
