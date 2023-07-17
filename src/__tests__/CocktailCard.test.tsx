
import { render } from '@testing-library/react';
import { QueryClientProvider, QueryClient, useQuery, useQueryClient } from '@tanstack/react-query';
import CocktailCard from '../components/CocktailCard';
import { ICocktail } from '../models/ICocktail';


jest.mock('@tanstack/react-query', () => {
  const originalModule = jest.requireActual('@tanstack/react-query');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return {
    ...originalModule,
    useQuery: jest.fn(),
    useQueryClient: jest.fn(),
  };
});

const queryClient = new QueryClient();

describe('CocktailCard', () => {
  const cocktail = {
    idDrink: '123',
    strDrink: 'Mojito',
    strDrinkThumb: 'mojito.jpg',
    strCategory: 'Cocktail',
  } as ICocktail;

  beforeEach(() => {
    (useQuery as jest.Mock).mockReset();
    (useQuery as jest.Mock).mockReturnValue({ data: [] });
    (useQueryClient as jest.Mock).mockReturnValue(queryClient);
  });

  it('renders cocktail card correctly in home mode', () => {
    const { getByText, getByAltText } = render(
      <QueryClientProvider client={queryClient}>
        <CocktailCard cocktail={cocktail} mode="home" />
      </QueryClientProvider>
    );

    expect(getByText(cocktail.strDrink)).toBeTruthy();
    expect(getByAltText(cocktail.strDrink)).toBeTruthy();
    expect(getByText(cocktail.strCategory)).toBeTruthy();
  });

});
