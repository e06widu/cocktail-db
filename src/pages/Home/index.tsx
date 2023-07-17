import React from 'react'
import { UseQueryResult, useQuery } from '@tanstack/react-query';
import { ICocktail } from '../../models/ICocktail';
import { lookupMultipleRandomCocktail } from '../../services/cocktail-db-api';
import CocktailGrid from '../../components/CocktailGrid';
import Layout from '../../components/Layout';
import Button from '../../components/Button';
import LoadingSpinner from '../../components/LoadingSpinner';
import { ReactComponent as RefreshIcon } from '../../images/recycle.svg';

import './styles.scss';

const Home: React.FC = () => {

  const useRandomCocktail = (): UseQueryResult<void | ICocktail[], Error> => {
    return useQuery<void | ICocktail[], Error>({
      queryKey: ['cocktail', 'random'],
      queryFn: lookupMultipleRandomCocktail,
      refetchOnWindowFocus: false,
      networkMode: 'always'
    })
  }

  const { isLoading, data, error, refetch } = useRandomCocktail()
  let searchResult = <></>;

  const refreshData = async (): Promise<void> => {
    console.log('fetch')
    await refetch();
  }
  // Fetching data
  if (isLoading) {
    searchResult = <LoadingSpinner />
  }
  // Error when fetching data
  if (error instanceof Error) {
    searchResult = <span>Error: {error.message}</span>
  }
  // Display data after fetch
  if (data) {
    searchResult = <div>
      <CocktailGrid cocktails={data} mode={'home'} />
    </div>
  } else {
    <span>No data found</span>
  }

  return (
    <Layout>
      <div className='home'>
        <h1>Random Cocktails</h1>
        <div className='search-result'>
          <div className='refresh-button'>
            <Button onClick={() => void refreshData()}>
              <div className='btn'>
                <div className="icon"><RefreshIcon /></div>
                <div className='text'>REFRESH</div>
              </div></Button>
          </div>
          {searchResult}
        </div>
      </div>
    </Layout>
  )
}

export default Home
