import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../store';
import TYPE_COLORS from '../helpers/typeColors';

function SelectedPokemon({ pokemon }) {
    const { setStoreSelectedPokemon } = useContext(StoreContext);
    const queryClient = useQueryClient();

    const handleBackOnClick = () => {
        setStoreSelectedPokemon(null);
        queryClient.removeQueries('selectedPokemon');
        queryClient.removeQueries('selectedPokemonSpecies');
    };

    return (
        <SelectedPokemonContainer>
            <TopSelectedPokemonContainer>
                <H1>
                    #{pokemon.order} <br />
                    {pokemon.species.name}
                </H1>
                <BackButton onClick={handleBackOnClick}>&lt;</BackButton>
            </TopSelectedPokemonContainer>
            <Img
                src={
                    pokemon.sprites.other?.['official-artwork']?.[
                        'front_default'
                    ]
                }
                alt={pokemon.name}
            />
            <TypesContainer>
                {pokemon.types.map((type) => {
                    return (
                        <Type $type={type.type.name} key={type.slot}>
                            {type.type.name}
                        </Type>
                    );
                })}
            </TypesContainer>
            <FlavorTextContainer>
                <P>{pokemon['flavor_text_entries'][0]['flavor_text']}</P>
            </FlavorTextContainer>
        </SelectedPokemonContainer>
    );
}

export default SelectedPokemon;

const SelectedPokemonContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: scroll;
`;

const TopSelectedPokemonContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
`;

const FlavorTextContainer = styled.div``;

const P = styled.p`
    white-space: pre-wrap;
`;

const H1 = styled.h1`
    text-transform: capitalize;
    text-align: center;
    width: 100%;
    margin-left: -10%;
`;

const BackButton = styled.i`
    font-family: sans-serif;
    font-style: normal;
    font-weight: 900;
    font-size: 45px;
    margin: 10px auto 0 0;
    display: block;
    color: blue;
    cursor: pointer;
    width: 10%;
`;

const Img = styled.img`
    width: 50%;
    margin: 0 auto;
`;

const TypesContainer = styled.div`
    width: 100%;
`;

const Type = styled.i`
    background-color: ${(props) => TYPE_COLORS[props.$type] || '#000'};
    padding: 6px 12px;
    border-radius: 24px;
    margin: 12px 12px 0 0;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
`;
