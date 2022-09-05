import { useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import styled from 'styled-components';
import { StoreContext } from '../store';

function SearchBar() {
    const {
        storeSearchTerm,
        setStoreSearchTerm,
        storeSelectedPokemon,
        setStoreSelectedPokemon,
    } = useContext(StoreContext);
    const queryClient = useQueryClient();

    const handleOnChange = (e) => {
        setStoreSearchTerm(e.target.value);
        if (e.target.value.length > 0 && storeSelectedPokemon) {
            setStoreSelectedPokemon(null);
            queryClient.removeQueries('selectedPokemon');
            queryClient.removeQueries('selectedPokemonSpecies');
        }
    };

    return (
        <SearchContainer>
            <Input
                type="text"
                value={storeSearchTerm}
                placeholder="Search"
                onChange={handleOnChange}
            />
        </SearchContainer>
    );
}

export default SearchBar;

const SearchContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 90%;
    padding: 20px 5%;
    background-color: #cc0000;
`;

const Input = styled.input`
    width: 100%;
    height: 35px;
    border: 1px solid black;
    border-radius: 5px;
    font-size: 30px;
    margin: 12px 0;
    text-align: center;
`;
