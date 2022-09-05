import { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../store';

function PokeListItem({ pokemon, number }) {
    const { setStoreSelectedPokemon } = useContext(StoreContext);

    const handleOnClick = (pokemon) => {
        setStoreSelectedPokemon(pokemon);
    };

    return (
        <Li title={pokemon.name} onClick={() => handleOnClick(pokemon)}>
            #{number} <br />
            {pokemon.name}
            <Img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${number}.png`}
                alt={pokemon.name}
            />
        </Li>
    );
}

export default PokeListItem;

const Li = styled.li`
    width: 32%;
    padding-bottom: 1%;
    margin-bottom: 2%;
    position: relative;
    border: 2px solid black;
    border-radius: 5px;
    font-size: 20px;
    text-align: center;
    text-transform: capitalize;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    &:hover {
        background-color: #ff5555;
        color: white;
        border-color: #fff;
    }
`;

const Img = styled.img`
    width: 50px;
    height: 50px;
    margin: 10px;
`;
