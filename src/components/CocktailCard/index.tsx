import React, { useEffect, useState } from 'react'
import { ICocktail } from '../../models/ICocktail'

import './styles.scss'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import Button from '../Button'
import Toast from '../Toast'

interface ICocktailCardProps {
    cocktail: ICocktail
    mode: 'home' | 'favorites' | 'search'
    handleRemoveFromCartToast?: (cocktail: ICocktail) => void
}

const CocktailCard: React.FC<ICocktailCardProps> = ({ cocktail, mode, handleRemoveFromCartToast }) => {
    const { data: favorites } = useQuery<ICocktail[]>(['cocktail', 'favorites']);
    const queryClient = useQueryClient();
    const [showToast, setShowToast] = useState<boolean>(false);

    const [isAlreadyInFavorite, setIsAlreadyInFavorite] = useState<boolean>(false)

    useEffect(() => {
        if (favorites)
            setIsAlreadyInFavorite(favorites.some(item => item.idDrink === cocktail.idDrink));
    }, [cocktail.idDrink, favorites]);

    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);

            return () => {
                clearTimeout(timer);
            };
        }
    }, [showToast]);

    const handleAddToCart = () => {
        queryClient.setQueryData<ICocktail[]>(['cocktail', 'favorites'], (oldData) =>
            [...(oldData || []), cocktail]);
        setShowToast(true);
    };

    const handleRemoveFromCart = () => {
        queryClient.setQueryData<ICocktail[]>(['cocktail', 'favorites'], (oldData) =>
            oldData?.filter((item) => item.idDrink !== cocktail.idDrink)
        );
        if(handleRemoveFromCartToast){
            void handleRemoveFromCartToast(cocktail);
        }
    };

    return (
        <div className='card-container'>
            <div>{cocktail.strDrink}</div>
            {<img className='thumb-image' src={cocktail.strDrinkThumb}
                alt={cocktail.strDrink} loading="lazy" />}

            {mode === 'home' ? <div>{cocktail.strCategory}</div> : null}
            {mode === 'search' ?
                isAlreadyInFavorite ? <div>Already added</div> : <Button disabled={isAlreadyInFavorite} onClick={() => void handleAddToCart()}>Add</Button>
                : null}
            {mode === 'favorites' ? <Button onClick={() => void handleRemoveFromCart()}>Remove</Button> : null}
            {showToast && <Toast message={`Cocktail ${cocktail.strDrink} Added`} />}
        </div>
    )
}

export default CocktailCard
