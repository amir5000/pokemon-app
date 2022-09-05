import { useQuery } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import useGetSelectedPokemon from '../Queries/useGetSelectedPokemon';
import useGetPokemon from '../Queries/useGetPokemon';
import { StoreContext } from '../store';
import PokeListItem from './PokeListItem';
import SelectedPokemon from './SelectedPokemon';
import useGetSelectedPokemonSpecies from '../Queries/useGetSelectedPokemonSpecies';

function PokeList() {
    const { storeSearchTerm, storeSelectedPokemon } = useContext(StoreContext);

    // const { status, data } = useQuery(["pokemonData"], () =>
    //   fetch("https://pokeapi.co/api/v2/pokemon?limit=898").then((res) =>
    //     res.json()
    //   )
    // );

    const {
        status,
        data,
        isFetching,
        isFetchingNextPage,
        fetchNextPage,
        hasNextPage,
    } = useGetPokemon();

    // const { status: selectedPokemonStatus, data: selectedPokemonData } = useQuery(
    //   ["selectedPokemon"],
    //   () => fetch(storeSelectedPokemon?.url).then((res) => res.json()),
    //   {
    //     enabled: !!storeSelectedPokemon,
    //   }
    // );

    const { status: selectedPokemonStatus, data: selectedPokemonData } =
        useGetSelectedPokemon({
            url: storeSelectedPokemon?.url,
            enabled: !!storeSelectedPokemon,
        });

    // const {
    //   status: selectedPokemonSpeciesStatus,
    //   data: selectedPokemonSpeciesData,
    // } = useQuery(
    //   ["selectedPokemonSpecies"],
    //   () => fetch(selectedPokemonData?.species?.url).then((res) => res.json()),
    //   {
    //     enabled: !!selectedPokemonData,
    //   }
    // );

    const {
        status: selectedPokemonSpeciesStatus,
        data: selectedPokemonSpeciesData,
    } = useGetSelectedPokemonSpecies({
        url: selectedPokemonData?.species?.url,
        enabled: !!selectedPokemonData,
    });

    if (
        status === 'loading' ||
        (storeSelectedPokemon && selectedPokemonStatus === 'loading') ||
        (selectedPokemonData && selectedPokemonSpeciesStatus === 'loading')
    ) {
        return <div>Loading...</div>;
    }

    if (selectedPokemonData && selectedPokemonSpeciesData) {
        return (
            <SelectedPokemon
                pokemon={{
                    ...selectedPokemonData,
                    ...selectedPokemonSpeciesData,
                }}
            />
        );
    }

    let filterResults = [];

    if (storeSearchTerm) {
        data?.pages.forEach((page) => {
            filterResults = [
                ...filterResults,
                ...page.results.map((result, index) => {
                    const pokemonNumber = `${index + 1}`;
                    if (
                        result?.name?.includes(storeSearchTerm) ||
                        pokemonNumber.includes(storeSearchTerm)
                    ) {
                        return result;
                    }
                    return null;
                }),
            ];
        });
    } else {
        data?.pages.forEach((page) => {
            filterResults = [...filterResults, ...page.results];
        });
    }
    return (
        <PokeListContainer>
            <Ul>
                {(!filterResults ||
                    filterResults.filter((result) => result).length === 0) && (
                    <div>
                        <P>No results found.</P>
                    </div>
                )}
                {filterResults?.map((pokemon, index) => {
                    if (!pokemon) {
                        return null;
                    }
                    return (
                        <PokeListItem
                            key={pokemon.name}
                            pokemon={pokemon}
                            number={index + 1}
                        />
                    );
                })}
            </Ul>
            {isFetching && <P>Loading...</P>}
            {hasNextPage && (
                <Button onClick={fetchNextPage} type="button">
                    {isFetchingNextPage ? 'Loading...' : 'Load More'}
                </Button>
            )}
            {!hasNextPage && <P>No more Pokémon 😭</P>}
        </PokeListContainer>
    );
}

export default PokeList;

const PokeListContainer = styled.div`
    overflow: scroll;
    height: 100%;
    width: 100%;
`;

const Ul = styled.ul`
    margin: 0;
    padding: 12px;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
`;

const P = styled.p`
    margin: 20px;
`;

const Button = styled.button`
    border-radius: 5px;
    border: 2px solid #444;
    padding: 6px 24px;
    color: #444;
    background: transparent;
    margin: 50px 0;
    cursor: pointer;
    font-size: 22px;
`;
