import { Box, Center, Spinner } from '@chakra-ui/react';
import { Suspense, unstable_useTransition as useTransition, useCallback, useState } from 'react';
import { fetchMovies, Movie } from './api/movies';
import { ErrorBoundary } from './ErrorBoundary';
import { MovieList } from './MovieList';
import { SearchInput } from './SearchInput';
import { randomTitle } from './utils/randomTitle';
import { createResource, ResourceReader } from './utils/resource';

const INITIAL_VALUE = randomTitle(['Pulp Fiction', 'Men in Black', 'Iron Man', 'The Shawshank Redemption', 'The Godfather', 'Star Wars']);

export function App() {
  const [resource, setResource] = useState<ResourceReader<Movie[]> | null>(null);
  const [startTransition, isPending] = useTransition({ busyDelayMs: 100, busyMinDurationMs: 400 });

  const onChange = useCallback((title: string, year: string) => {
    startTransition(() => {
      setResource(createResource(() => fetchMovies(title, year)))
    });
  }, [startTransition, setResource])

  return (
    <Box>
      <SearchInput onChange={onChange} initialValue={INITIAL_VALUE} />

      <Box my={6} px={4} opacity={isPending ? 0.5 : 1} transition="opacity 100ms 200ms">
        {resource
          ? (
            <ErrorBoundary>
              <Suspense fallback={<Center><Spinner size="xl" /></Center>}>
                <MovieList moviesReader={resource} />
              </Suspense>
            </ErrorBoundary>
          )
          : <Center fontSize="xl">Search for movies using form above</Center>
        }
      </Box>
    </Box>
  );
}
