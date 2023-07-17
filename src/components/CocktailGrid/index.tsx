import React, { useState } from 'react'
import './styles.scss'
import { ICocktail } from '../../models/ICocktail'
import CocktailCard from '../CocktailCard'
import Toast from '../Toast';


interface CocktailGridProps {
    cocktails: ICocktail[];
    mode: 'home' | 'favorites' | 'search'

}

const CocktailGrid: React.FC<CocktailGridProps> = ({ cocktails, mode }) => {
    const [showToast, setShowToast] = useState<boolean>(false);
    const [toastMessage, setToastMessage] = useState<string>('');

    const handleRemoveFromCart = (cocktail: ICocktail) => {
      
        setToastMessage(`Cocktail ${cocktail.strDrink} removed from favorites`);
        setShowToast(true);
    };
    return (
        <>
      <div className="grid-container">
        {cocktails.map((drink: ICocktail) => (
          <CocktailCard
            cocktail={drink}
            key={drink.idDrink}
            mode={mode}
            handleRemoveFromCartToast={()=> void handleRemoveFromCart(drink)}
          />
        ))}
      </div>
      {showToast && <Toast message={toastMessage} />}
    </>
    )
}

export default CocktailGrid
