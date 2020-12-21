import { Box, Button, Input, Text, Stack, chakra } from "@chakra-ui/react"
import { useCallback, useState } from "react"

interface Props {
  initialValue: string;
  onChange: (value: string, year: string) => void;
}

export const SearchInput = ({ onChange, initialValue }: Props) => {
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');

  const onTitleInputChange = useCallback((value: string) => {
    setTitle(value);
  }, [setTitle]);

  const setInitialValue = () => {
    setTitle(initialValue);
    setYear('');
    onChange(initialValue, '');
  };

  return (
    <Box p="4" roundedBottom="lg" bg="blue.400">
      <Text mb="1" align="center" fontSize="2xl" fontWeight="bold" color="white">
        Search for movies 🍿
      </Text>

      <Text mb="4" align="center" fontSize="lg" fontWeight="bold" color="white">
        (for example <chakra.span color="gray.200" fontStyle="italic" cursor="pointer" onClick={setInitialValue}>{initialValue}</chakra.span>)
      </Text>

      <Stack spacing={4} direction={['column', 'row']}>
        <Input
          bg="white"
          autoFocus
          minW={100}
          value={title}
          placeholder="Type movie name"
          onKeyDown={({ code }) => code === 'Enter' && onChange(title, year)}
          onChange={({ target }) => onTitleInputChange(target.value)}
        />

        <Input
          bg="white"
          minW={100}
          value={year}
          placeholder="Year (optional)"
          onKeyDown={({ code }) => code === 'Enter' && onChange(title, year)}
          onChange={({ target }) => setYear(target.value)}
        />

        <Button px={8} onClick={() => onChange(title, year)}>Search</Button>
      </Stack>
    </Box>
  );
}
