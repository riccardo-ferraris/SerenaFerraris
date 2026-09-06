import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PremierePlayer from './PremierePlayer';
const event = { bride: 'Anna', groom: 'Marco', videoUrl: '/film.mp4', premiere_start_time: '2026-09-12T19:30:00Z' };
beforeEach(() => { jest.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(() => Promise.resolve()); });
afterEach(() => jest.restoreAllMocks());
test('late arrival and drift are aligned to the shared time', () => {
  jest.useFakeTimers();
  const now = () => Date.parse(event.premiere_start_time) + 45000;
  const { container } = render(<PremierePlayer event={event} getNow={now} replay={false} onEnd={jest.fn()} onDuration={jest.fn()} />);
  const video = container.querySelector('video');
  Object.defineProperty(video, 'readyState', { value: 1 });
  Object.defineProperty(video, 'duration', { value: 120 });
  fireEvent.loadedMetadata(video);
  expect(video.currentTime).toBe(45);
  video.currentTime = 30;
  jest.advanceTimersByTime(3000);
  expect(video.currentTime).toBe(45);
  jest.useRealTimers();
});
test('replay keeps a personal timeline', () => {
  const { container } = render(<PremierePlayer event={event} getNow={() => Date.parse(event.premiere_start_time) + 45000} replay onEnd={jest.fn()} onDuration={jest.fn()} />);
  const video = container.querySelector('video');
  Object.defineProperty(video, 'readyState', { value: 1 });
  fireEvent.loadedMetadata(video);
  expect(video.currentTime).toBe(0);
  expect(video.controls).toBe(true);
});
test('missing film has an explicit waiting state', () => {
  render(<PremierePlayer event={{ ...event, videoUrl: '' }} getNow={() => null} onEnd={jest.fn()} onDuration={jest.fn()} />);
  expect(screen.getByText('Le emozioni stanno arrivando.')).toBeInTheDocument();
});
