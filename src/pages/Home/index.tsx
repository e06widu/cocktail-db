import React from 'react'
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ICocktail } from '../../models/ICocktail';
import { lookupMultipleRandomCocktail } from '../../services/cocktail-db-api';
import CocktailGrid from '../../components/CocktailGrid';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';

const useRandomCocktail = (): UseQueryResult<void | ICocktail[], Error> => {
  return useQuery<void | ICocktail[], Error>({
    queryKey: ['cocktail', 'random'],
    queryFn: lookupMultipleRandomCocktail,
    refetchOnWindowFocus: false,
    // networkMode: 'always'
  })
}

const Home: React.FC = () => {
  const { isLoading, data, error, refetch } = useRandomCocktail()
  let searchResult = <></>;

  const refreshData = async (): Promise<void> => {
    console.log('fetch')
    await refetch();
  }

  if (isLoading) {
    searchResult = <LoadingSpinner />
  }

  if (error instanceof Error) {
    searchResult = <span>Error: {error.message}</span>
  }

  if (data) {
    searchResult = <div>
      <CocktailGrid cocktails={data} mode={'home'} />
    </div>
  } else {
    <span>No data found</span>
  }

  return (
    <Layout>
      <h1>Random Cocktails</h1>
      <Button onClick={() => void refreshData()}>Refresh</Button>
      {searchResult}
    </Layout>
  )
}

export default Home
