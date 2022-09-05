import { useMemo, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import SearchBar from './components/SearchBar';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import PokeList from './components/PokeList';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { StoreContext } from './store';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

function App() {
    const [storeSearchTerm, setStoreSearchTerm] = useState('');
    const [storeSelectedPokemon, setStoreSelectedPokemon] = useState(null);

    const storeValue = useMemo(
        () => ({
            storeSearchTerm,
            setStoreSearchTerm,
            storeSelectedPokemon,
            setStoreSelectedPokemon,
        }),
        [storeSearchTerm, storeSelectedPokemon]
    );
    return (
        <QueryClientProvider client={queryClient}>
            <StoreContext.Provider value={storeValue}>
                <div className="App">
                    <header>
                        <h1>PokéDex</h1>
                    </header>

                    <Main>
                        <SearchBar />
                        <PokeList />
                    </Main>
                </div>
            </StoreContext.Provider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;

const Main = styled.main`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    border: 5px solid black;
    border-radius: 30px;
    max-width: 600px;
    margin: 0 auto;
    height: 75vh;
    overflow: hidden;
`;
