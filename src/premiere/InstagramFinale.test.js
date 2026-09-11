import React from "react";
import { act, fireEvent, render, screen } from "@testing-library/react";
import InstagramFinale, { INSTAGRAM_URL, INSTAGRAM_REDIRECT_SECONDS } from "./InstagramFinale";

const originalLocation = window.location;
beforeEach(() => {
  jest.useFakeTimers();
  delete window.location;
  window.location = { assign: jest.fn() };
});
afterEach(() => {
  window.location = originalLocation;
  jest.useRealTimers();
});

test("shows Instagram and redirects only after the countdown", () => {
  render(<InstagramFinale />);
  expect(screen.getByRole("link")).toHaveAttribute("href", INSTAGRAM_URL);
  act(() => jest.advanceTimersByTime((INSTAGRAM_REDIRECT_SECONDS - 1) * 1000));
  expect(screen.getByRole("timer")).toHaveTextContent("1");
  expect(window.location.assign).not.toHaveBeenCalled();
  act(() => jest.advanceTimersByTime(1000));
  expect(window.location.assign).toHaveBeenCalledTimes(1);
  expect(window.location.assign).toHaveBeenCalledWith(INSTAGRAM_URL);
});

test("staying on the page cancels the redirect", () => {
  render(<InstagramFinale />);
  act(() => jest.advanceTimersByTime(INSTAGRAM_REDIRECT_SECONDS * 500));
  fireEvent.click(screen.getByRole("button", { name: "Resta su questa pagina" }));
  act(() => jest.advanceTimersByTime(INSTAGRAM_REDIRECT_SECONDS * 2000));
  expect(window.location.assign).not.toHaveBeenCalled();
  expect(screen.getByRole("status")).toHaveTextContent("annullato");
});

test("leaving the finale for replay or navigation clears the timer", () => {
  const { unmount } = render(<InstagramFinale />);
  act(() => jest.advanceTimersByTime(INSTAGRAM_REDIRECT_SECONDS * 500));
  unmount();
  act(() => jest.advanceTimersByTime(INSTAGRAM_REDIRECT_SECONDS * 2000));
  expect(window.location.assign).not.toHaveBeenCalled();
});
