import { render } from '@testing-library/react';
import { ICocktail } from '../models/ICocktail';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CocktailCard from '../components/CocktailCard';


const queryClient = new QueryClient();

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

      expect(container.firstChild).toMatchSnapshot();
    });
  
    
  });