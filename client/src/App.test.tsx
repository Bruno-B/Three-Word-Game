import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

describe("user can only input 3 words", () => {
  test("when input is empty", () => {
    render(<App />);
    const input = screen.getByLabelText("new-sentence") as HTMLInputElement;
    const button = screen.getByText("Send");
    fireEvent.change(input, { target: { value: "" } });
    fireEvent.click(button);
    expect(screen.queryByText("Hello world! I")).not.toBeInTheDocument();
  });

  test("when user inputs 3 words", () => {
    render(<App />);
    const input = screen.getByLabelText("new-sentence") as HTMLInputElement;
    const button = screen.getByText("Send");
    fireEvent.change(input, { target: { value: "Hello world! I" } });
    fireEvent.click(button);
    expect(screen.getByText("Hello world! I")).toBeInTheDocument();
  });

  test("when user input 2 words", () => {
    render(<App />);
    const input = screen.getByLabelText("new-sentence") as HTMLInputElement;
    const button = screen.getByText("Send");
    fireEvent.change(input, { target: { value: "Hello world!" } });
    fireEvent.click(button);
    expect(screen.queryByText("Hello world!")).not.toBeInTheDocument();
    expect(screen.getByText("Too few words!")).toBeInTheDocument();
  });

  test("when user inputs 4 words", () => {
    render(<App />);
    const input = screen.getByLabelText("new-sentence") as HTMLInputElement;
    const button = screen.getByText("Send");
    fireEvent.change(input, { target: { value: "Hello world! I am" } });
    fireEvent.click(button);
    expect(screen.queryByText("Hello world!")).not.toBeInTheDocument();
    expect(screen.getByText("Too many words!")).toBeInTheDocument();
  });
});