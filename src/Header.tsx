import { Box, Button, chakra, Flex, Input, Text, useColorModeValue } from "@chakra-ui/react";
import { useState } from "react";

interface Props {
  initialValue: string;
  onSearch: (value: string, year: string) => void;
}

export const Header = ({ onSearch, initialValue }: Props) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const headerBackground = useColorModeValue('blue.400', 'blue.800')
  const inputBackground = useColorModeValue('white', 'gray.800')

  const setInitialValue = () => {
    setTitle(initialValue);
    setYear('');
    onSearch(initialValue, '');
  };

  return (
    <Box p="4" roundedBottom="lg" bg={headerBackground}>
      <Text mb="1" align="center" fontSize="2xl" fontWeight="bold" color="white">
        Search for movies 🍿
      </Text>

      <Text mb="4" align="center" fontSize="lg" fontWeight="bold" color="white">
        (for example <chakra.span color="gray.200" fontStyle="italic" cursor="pointer" onClick={setInitialValue}>{initialValue}</chakra.span>)
      </Text>

      <Flex direction={['column', 'row']}>
        <Input
          bg={inputBackground}
          autoFocus
          value={title}
          placeholder="Type movie name"
          onKeyDown={({ code }) => code === 'Enter' && onSearch(title, year)}
          onChange={({ target }) => setTitle(target.value)}
        />

        <Input
          transition="all .4s"
          bg={inputBackground}
          width={['100%', (title === '' ? 0 : '100%')]}
          height={[(title === '' ? 0 : '40px'), '40px']}
          paddingX={[4, (title === '' ? 0 : 4)]}
          marginLeft={[0, (title === '' ? 0 : 4)]}
          borderWidth={(title === '' ? 0 : '1px')}
          marginTop={[(title === '' ? 0 : 4), 0]}
          value={year}
          placeholder="Year (optional)"
          onKeyDown={({ code }) => code === 'Enter' && onSearch(title, year)}
          onChange={({ target }) => setYear(target.value)}
        />

        <Button
          marginLeft={[0, 4]}
          marginTop={[4, 0]}
          px={8}
          onClick={() => onSearch(title, year)}>
          Search
        </Button>
      </Flex>
    </Box>
  );
}
