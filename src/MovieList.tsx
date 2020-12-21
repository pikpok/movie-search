import { Movie } from "./api/movies";
import { ResourceReader } from "./utils/resource";

interface Props {
  moviesReader: ResourceReader<Movie[]>;
}

export const MovieList = ({ moviesReader }: Props) => {
  const movies = moviesReader.read();

  if (!movies || movies.length === 0) return <h1>No movies found!</h1>;

  return (
    <div>
      {movies.map((movie) => (
        <h1 key={movie.id}>{movie.title} ({movie.year})</h1>
      ))}
    </div>
  );
}
