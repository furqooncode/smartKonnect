export function FormatHometime(isoString) {
  if (!isoString) return '';

  const date = new Date(isoString);
  if (isNaN(date.getTime())) return '';

  const now = new Date();
  
  // Reset time to midnight for accurate day comparison
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const messageDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());

  //  Today : Show Time . 8:35 PM
  if (messageDate.getTime() === today.getTime()) {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    const formattedHours = hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;

    return `\ ${formattedHours}:${formattedMinutes} ${ampm}`;
  }

  // 2. Yesterday → Show "Yesterday"
  if (messageDate.getTime() === yesterday.getTime()) {
    return 'Yesterday';
  }

  // 3. Older than 2 days → Show DD/MM/YY (e.g. 12/04/26)
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit'
  }).replace(/\//g, '/'); // ensures 12/04/26 format
}