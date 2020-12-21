import { Box, Flex, Spinner } from '@chakra-ui/react';
import { Suspense, unstable_useTransition as useTransition, useCallback, useState } from 'react';
import { fetchMovies } from './api/movies';
import { MovieList } from './MovieList';
import { createResource } from './utils/resource';
import { SearchInput } from './SearchInput';

const INITIAL_VALUE = 'Pulp Fiction';

export function App() {
  const [resource, setResource] = useState(() => createResource(() => fetchMovies(INITIAL_VALUE)))
  const [startTransition, isPending] = useTransition({ busyDelayMs: 100, busyMinDurationMs: 400 });

  const onChange = useCallback((value: string) => {
    startTransition(() => {
      setResource(createResource(() => fetchMovies(value)))
    });
  }, [startTransition, setResource])

  return (
    <Box>
      <Box>
        <SearchInput onChange={onChange} initialValue={INITIAL_VALUE} />
      </Box>

      <Box my={6} px={4} opacity={isPending ? 0.5 : 1} transition="opacity 100ms 200ms">
        <Suspense fallback={<Flex justifyContent="center"><Spinner /></Flex>}>
          <MovieList moviesReader={resource} />
        </Suspense>
      </Box>
    </Box>
  );
}
