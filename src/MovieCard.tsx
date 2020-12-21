import { AspectRatio, Box, chakra, Flex, Image, Link, Text } from "@chakra-ui/react";
import { Movie } from "./api/movies";
import { capitalize } from "./utils/capitalize";

interface Props {
  movie: Movie;
}

export const MovieCard = ({ movie }: Props) => {
  return (
    <Box boxShadow="lg" rounded="lg">
      <Flex h="100%" justify="space-between" direction={['column-reverse', 'row']} >
        <Flex direction="column" p="4">
          <Box mb="2" fontSize="xl" fontWeight="bold">{movie.title}</Box>

          <Flex flex={1} justify="space-between" direction={['row', 'column']}>
            <Box mb={[0, 2]}>
              <Text><chakra.span fontWeight="bold">Year:</chakra.span> {movie.year}</Text>
              <Text><chakra.span fontWeight="bold">Type:</chakra.span> {capitalize(movie.type)}</Text>
            </Box>

            <Link
              target="_blank"
              href={`https://www.imdb.com/title/${movie.id}`}
              alignSelf={['flex-end', 'flex-start']}
              fontWeight="bold"
              color="blue.500"
            >
              Open IMDb
            </Link>
          </Flex>
        </Flex>

        <AspectRatio alignSelf="stretch" ratio={[1.5, 0.7]} minW={['auto', '150px']}>
          <Image
            roundedTop={['lg', 0]}
            roundedRight={[0, 'lg']}
            src={movie.poster}
            alt={movie.title}
            fallbackSrc="/placeholder.svg" />
        </AspectRatio>
      </Flex>
    </Box>
  );
}
