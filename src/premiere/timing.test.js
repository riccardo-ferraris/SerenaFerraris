import { premierePhase, remainingSeconds, videoPosition } from './timing';
const start = '2026-09-12T21:30:00+02:00';
const epoch = Date.parse(start);
test('waiting room transitions exactly at the last thirty seconds', () => {
  expect(premierePhase(start, epoch - 30001)).toBe('waiting');
  expect(premierePhase(start, epoch - 30000)).toBe('countdown');
  expect(premierePhase(start, epoch)).toBe('live');
});
test('late arrivals seek to the shared timeline and see the ending after duration', () => {
  expect(videoPosition(start, epoch + 45000)).toBe(45);
  expect(premierePhase(start, epoch + 120000, 120)).toBe('ended');
  expect(videoPosition(start, epoch - 2000)).toBe(0);
});
test('countdown rounds up and does not display negative seconds', () => {
  expect(remainingSeconds(start, epoch - 501)).toBe(1);
  expect(remainingSeconds(start, epoch + 1000)).toBe(0);
});
