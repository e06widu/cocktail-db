import React, { useEffect, useState } from 'react'
import { UseQueryResult, useQuery, useQueryClient } from '@tanstack/react-query'
import { searchCocktailByName } from '../../services/cocktail-db-api'
import { ISearchCocktailResponse } from '../../models/IResponses'
import CocktailGrid from '../../components/CocktailGrid'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'
import './styles.scss'


const SearchCocktails: React.FC = () => {
    const useSearchCocktailByName = (searchText: string): UseQueryResult<ISearchCocktailResponse, Error> => {
        return useQuery<ISearchCocktailResponse, Error>({
            queryKey: ['search', 'cocktail'],
            queryFn: () => searchCocktailByName(searchText),
            refetchOnWindowFocus: false,
            networkMode: 'always',
            enabled: false

        })
    }
    const [searchText, setSearchText] = useState<string>('');
    const [hasSearched, setHasSearched] = useState<boolean>(false);
    const { isLoading, data, error, refetch } = useSearchCocktailByName(searchText);
    const { data: searchTextSaved } = useQuery<string>(['cocktail', 'searchText']);
    const queryClient = useQueryClient();


    let searchResult = <div></div>

    const searchCocktails = async (): Promise<void> => {
        if (searchText.trim().length > 0) {
            queryClient.setQueryData<string>(['cocktail', 'searchText'], searchText);
            setHasSearched(true);
            await refetch();
        }
    }

    useEffect(() => {
        if (searchTextSaved) {
            setSearchText(searchTextSaved)
            setHasSearched(true);
        }
    }, [queryClient, searchTextSaved]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    const clearSearch = () => {
        if (searchText.trim().length > 0) {
            queryClient.setQueryData<string>(['cocktail', 'searchText'], '');
            setSearchText('');
            queryClient.removeQueries(['search', 'cocktail']);
        }
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            void searchCocktails();
        }
    };
    // Loading data
    if (isLoading) {
        searchResult = <LoadingSpinner />
    }
    // Error when fetching data
    if (error instanceof Error) {
        searchResult = <span>Error: {error.message}</span>
    }
    // Display data after fetch
    if (data?.drinks) {
        searchResult = <CocktailGrid cocktails={data.drinks} mode={'search'} />
    } else {
        searchResult = <span className='no-data'>No data found</span>
    }

    return (
        <Layout>
            <div className='search-flex'>
                <input type="text" placeholder='search cocktail' value={searchText} onChange={handleChange} onKeyDown={handleKeyDown} />
                <Button onClick={() => void searchCocktails()}>Search</Button>
                <Button onClick={() => void clearSearch()}>Clear</Button>
            </div>
            <div className='search-message'>
                {hasSearched && searchText.trim().length > 0 ? <div className='search-result'><span>Search Results for :</span> <span className='search-text'>{searchText}</span></div> : null}
                {searchResult}
            </div>
        </Layout>
    )
}

export default SearchCocktails
