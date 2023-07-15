import React, { useState } from 'react'
import { UseQueryResult, useQuery } from '@tanstack/react-query'
import { searchCocktailByName } from '../../services/cocktail-db-api'
import { ISearchCocktailResponse } from '../../models/IResponses'
import CocktailGrid from '../../components/CocktailGrid'
import Layout from '../../components/Layout'
import Button from '../../components/Button'
import LoadingSpinner from '../../components/LoadingSpinner'

const useSearchCocktailByName = (searchText: string): UseQueryResult<ISearchCocktailResponse, Error> => {
    return useQuery<ISearchCocktailResponse, Error>({
        queryKey: ['search', 'cocktail'],
        queryFn: () => searchCocktailByName(searchText),
        refetchOnWindowFocus: false,
        enabled: false

    })
}

const SearchCocktails: React.FC = () => {

    const [searchText, setSearchText] = useState<string>('');
    const { isLoading, data, error, refetch } = useSearchCocktailByName(searchText);
    let searchResult = <div></div>

    const searchCocktails = async (): Promise<void> => {
        if (searchText.trim().length > 0) {
            await refetch();
        }
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchText(event.target.value);
    };

    if (isLoading) {
        searchResult =  <LoadingSpinner />
    }

    if (error instanceof Error) {
        searchResult = <span>Error: {error.message}</span>
    }

    if(data?.drinks){
        searchResult = <CocktailGrid cocktails={data.drinks} mode={'search'} />
    }else{
        searchResult = <span>No data found</span>
    }

    return (
            <Layout>
                <input type="text" value={searchText} onChange={handleChange} />
                <Button onClick={() => void searchCocktails()}>Search</Button>
                <div>
                    {searchResult}
                </div>
            </Layout>
    )
}

export default SearchCocktails
