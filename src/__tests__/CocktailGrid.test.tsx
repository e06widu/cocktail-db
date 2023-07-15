import { render, fireEvent } from '@testing-library/react';
import { ICocktail } from '../models/ICocktail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CocktailCard from '../components/CocktailCard';

const queryClient = new QueryClient();

// Mock data for testing
const cocktail: ICocktail = {
  idDrink: '1',
  strDrink: 'Mojito',
} as ICocktail;

describe('CocktailCard', () => {
    test('renders cocktail card', () => {
      const { container } = render(
        <QueryClientProvider client={queryClient}>
          <CocktailCard
            cocktail={cocktail}
            mode="home"
            handleRemoveFromCartToast={jest.fn()}
          />
        </QueryClientProvider>
      );
  
      // Verify the rendered component matches the snapshot
      expect(container.firstChild).toMatchSnapshot();
    });
  
    test('handles remove from cart', () => {
      const handleRemoveFromCartToast = jest.fn();
  
      const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <CocktailCard
            cocktail={cocktail}
            mode="favorites"
            handleRemoveFromCartToast={handleRemoveFromCartToast}
          />
        </QueryClientProvider>
      );
  
      // Click the remove button
      fireEvent.click(getByText('Remove'));
  
      // Check if the handleRemoveFromCartToast function is called
      expect(handleRemoveFromCartToast).toHaveBeenCalledWith(cocktail);
    });
  });