// src/App.test.js
import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

beforeEach(() => {
  window.localStorage.clear();
});

test("renders sign in page by default", async () => {
  render(
    <MemoryRouter initialEntries={["/"]}>
      <App />
    </MemoryRouter>
  );
  // Since redirects are async, wait for the "Sign in" text to appear
  expect(await screen.findByText(/Sign in/i)).toBeInTheDocument();
});