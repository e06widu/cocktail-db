import React from 'react'
import Layout from '../../components/Layout'
import { useQuery } from '@tanstack/react-query';
import { ICocktail } from '../../models/ICocktail';
import CocktailGrid from '../../components/CocktailGrid';

const Favorites: React.FC = () => {

    const { data: favorites } = useQuery<ICocktail[]>(['cocktail', 'favorites']);
    return (
        <Layout>
            <div>Favorites</div>
            {favorites ? <CocktailGrid cocktails={favorites} mode={'favorites'}/> : null}
            
        </Layout>
    )
}

export default Favorites
