type MovieType = 'movie' | 'series' | 'episode' | 'game';

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

export function fetchMovies(title: string, year = ''): Promise<Movie[]> {
  const apiKey = process.env.REACT_APP_API_KEY || '';
  const params = new URLSearchParams({
    apikey: apiKey,
    s: title,
  });

  if (year) {
    params.set('y', year);
  }

  return fetch(`https://www.omdbapi.com/?${params.toString()}`)
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
