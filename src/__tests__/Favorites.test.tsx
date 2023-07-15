import { render } from '@testing-library/react';
import Favorites from '../pages/Favorites';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ICocktail } from '../models/ICocktail';

const queryClient = new QueryClient();

queryClient.setQueryData<ICocktail[]>(['cocktail', 'favorites'],
    [
        { idDrink: '1', strDrink: 'Mojito' } as ICocktail,
        { idDrink: '2', strDrink: 'Cosmopolitan' } as ICocktail,
    ]
);

jest.mock('../components/Header', () => () => <div data-testid="mocked-header">Mocked Header</div>);

test('renders "Favorites" text', () => {
    const { getByText } = render(
        <QueryClientProvider client={queryClient}>
            <Favorites />
        </QueryClientProvider>
    );

    // Check if the "Favorites" text is rendered
    expect(getByText('Favorites')).toBeTruthy();
});

test('renders CocktailGrid with favorites data', () => {
    const { getByText } = render(
        <QueryClientProvider client={queryClient}>
          <Favorites />
        </QueryClientProvider>
      );
    // Check if the CocktailGrid component is rendered
    const cocktailGrid = getByText('Mojito');
    expect(cocktailGrid).toBeTruthy();
});
