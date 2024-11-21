export const getPokemonId = (url: string): number => {
  return parseInt(url.split("/").at(-2)!, 10);
};
