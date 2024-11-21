import axios from "axios";

const path = "https://pokeapi.co/api/v2/pokemon";

export async function useAxiosQuery(page: number) {
  const response = await axios.get(path, {
    params: {
      offset: (page - 1) * 21,
      limit: 21,
    },
  }); // Récupération et pagination des données ( pokémons )
  await wait(1);
  return response;
}

const wait = (duration: number) => {
  return new Promise((resolve) => setTimeout(resolve, duration * 1000));
};
