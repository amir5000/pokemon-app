import React from 'react';

export const StoreContext = React.createContext({
    storeSearchTerm: '',
    setStoreSearchTerm: () => {},
    storeSelectedPokemon: '',
    setStoreSelectedPokemon: () => {},
});
