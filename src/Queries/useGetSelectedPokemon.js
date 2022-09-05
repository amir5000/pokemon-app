import { useQuery } from '@tanstack/react-query';

function useGetSelectedPokemon({ url, enabled }) {
    return useQuery(
        ['selectedPokemon'],
        () => fetch(url).then((res) => res.json()),
        {
            enabled,
        }
    );
}

export default useGetSelectedPokemon;
