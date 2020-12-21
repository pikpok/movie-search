import { Center, SimpleGrid } from "@chakra-ui/react";
import { Movie } from "./api/movies";
import { MovieCard } from "./MovieCard";
import { ResourceReader } from "./utils/resource";

interface Props {
  moviesReader: ResourceReader<Movie[]>;
}

export const MovieList = ({ moviesReader }: Props) => {
  const movies = moviesReader.read();

  if (!movies || movies.length === 0) return <Center fontSize="2xl">No movies found!</Center>;

  return (
    <SimpleGrid columns={[1, 1, 2, 3]} spacing={6} >
      {movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
    </SimpleGrid>
  );
}
