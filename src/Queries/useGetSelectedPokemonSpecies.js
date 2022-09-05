import { useQuery } from '@tanstack/react-query';

function useGetSelectedPokemonSpecies({ url, enabled }) {
    return useQuery(
        ['selectedPokemonSpecies'],
        () => fetch(url).then((res) => res.json()),
        {
            enabled,
        }
    );
}

export default useGetSelectedPokemonSpecies;
