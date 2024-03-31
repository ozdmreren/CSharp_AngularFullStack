export function truncateText(text: string) {
  if (text.length < 20) {
    return text;
  } else {
    return text.substring(0, 20) + '...';
  }
}
