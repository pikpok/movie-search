import { Center, Link } from "@chakra-ui/react";
import { Component } from "react";

export class ErrorBoundary extends Component<{}, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center fontSize="xl">
          Something went wrong.
          {' '}
          <Link color="blue.400" onClick={() => this.setState({ hasError: false })}>Try again</Link>
        </Center>
      );
    }

    return this.props.children;
  }
}
