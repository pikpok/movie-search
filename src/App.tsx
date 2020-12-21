import { Box } from '@chakra-ui/react';
import { Suspense, unstable_useTransition as useTransition, useCallback, useState } from 'react';
import { fetchMovies } from './api/movies';
import { MovieList } from './MovieList';
import { createResource } from './utils/resource';
import { SearchInput } from './SearchInput';

const INITIAL_VALUE = 'Pulp Fiction';

export function App() {
  const [resource, setResource] = useState(() => createResource(() => fetchMovies(INITIAL_VALUE)))
  const [startTransition, isPending] = useTransition({ busyDelayMs: 300, busyMinDurationMs: 700 });

  const onChange = useCallback((value: string) => {
    startTransition(() => {
      setResource(createResource(() => fetchMovies(value)))
    });
  }, [startTransition, setResource])

  return (
    <Box>
      <Box pb="2">
        <SearchInput onChange={onChange} initialValue={INITIAL_VALUE} />
      </Box>

      <strong>Transition: {isPending ? 'Pending' : 'Not pending'}</strong>

      <Box p="4" opacity={isPending ? 0.5 : 1} transition="opacity 100ms 200ms">
        <Suspense fallback={<h1>Loading..</h1>}>
          <MovieList moviesReader={resource} />
        </Suspense>
      </Box>
    </Box>
  );
}
