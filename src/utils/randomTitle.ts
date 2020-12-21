export const randomTitle = (titles: string[]): string => {
  const randomIndex = Math.floor(Math.random() * titles.length);

  return titles[randomIndex];
}
