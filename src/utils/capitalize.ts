export const capitalize = (name: string) => {
  if (name.length > 0) {
    return name[0].toUpperCase() + name.slice(1);
  }

  return '';
}
