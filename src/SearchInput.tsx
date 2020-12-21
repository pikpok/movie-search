import { Button, Flex, Input } from "@chakra-ui/react"
import { useCallback, useState } from "react"

interface Props {
  onChange: (value: string) => void;
  initialValue: string;
}

export const SearchInput = ({ onChange, initialValue }: Props) => {
  const [search, setSearch] = useState(initialValue);

  const onInputChange = useCallback((value: string) => {
    setSearch(value);
  }, [setSearch]);

  return (
    <Flex p="4" roundedBottom="lg" bg="blue.400">
      <Input
        bg="white"
        mr="4"
        minW={100}
        value={search}
        onChange={({ target }) => onInputChange(target.value)}
      />

      <Button onClick={() => onChange(search)}>Update</Button>
    </Flex>
  );
}
