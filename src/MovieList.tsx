import { SimpleGrid } from "@chakra-ui/react";
import { Movie } from "./api/movies";
import { MovieCard } from "./MovieCard";
import { ResourceReader } from "./utils/resource";

interface Props {
  moviesReader: ResourceReader<Movie[]>;
}

export const MovieList = ({ moviesReader }: Props) => {
  const movies = moviesReader.read();

  if (!movies || movies.length === 0) return <h1>No movies found!</h1>;

  return (
    <SimpleGrid columns={[1, 2, 2, 3]} spacing={6} >
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </SimpleGrid>
  );
}
