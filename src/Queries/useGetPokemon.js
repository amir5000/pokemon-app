import { useInfiniteQuery } from '@tanstack/react-query';

//898

function useGetPokemon() {
    return useInfiniteQuery(
        ['pokemonData'],
        ({
            pageParam = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=0',
        }) => {
            return fetch(pageParam).then((res) => res.json());
        },
        {
            getNextPageParam: (lastPage) => {
                return lastPage?.next ?? undefined;
            },
        }
    );
}

export default useGetPokemon;
