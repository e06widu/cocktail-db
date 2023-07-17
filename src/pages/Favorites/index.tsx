import React from 'react'
import Layout from '../../components/Layout'
import { useQuery } from '@tanstack/react-query';
import { ICocktail } from '../../models/ICocktail';
import CocktailGrid from '../../components/CocktailGrid';
import './styles.scss'

const Favorites: React.FC = () => {

    const { data: favorites } = useQuery<ICocktail[]>(['cocktail', 'favorites']);
    return (
        <Layout>
           <div className='favorites'>
           <h1>Favorites</h1>
            {favorites ? favorites.length === 0 ?
                <div className='all-removed'>All removed</div> : null :
                <div className='no-favorites'>No Favorite Cocktails added</div>}
            {favorites ? <CocktailGrid cocktails={favorites} mode={'favorites'} /> : null}
           </div>

        </Layout>
    )
}

export default Favorites
