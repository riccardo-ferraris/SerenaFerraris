export function remainingSeconds(start, now) {
  return Math.max(0, Math.ceil((Date.parse(start) - now) / 1000));
}
export function premierePhase(start, now, duration = Infinity) {
  const elapsed = (now - Date.parse(start)) / 1000;
  if (elapsed >= duration) return 'ended';
  if (elapsed >= 0) return 'live';
  return elapsed >= -30 ? 'countdown' : 'waiting';
}
export function videoPosition(start, now) {
  return Math.max(0, (now - Date.parse(start)) / 1000);
}
