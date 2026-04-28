export function FormatTime(isoString: string): string {
  if (!isoString) return '—';

  const date = new Date(isoString);

  if (isNaN(date.getTime())) {
    console.error('Invalid time:', isoString);
    return '—';
  }

  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours = hours % 12 || 12;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes} ${ampm}`;
}