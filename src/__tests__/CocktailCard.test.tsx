import { render, screen, fireEvent } from '@testing-library/react';
import CocktailCard from '../components/CocktailCard';
import { ICocktail } from '../models/ICocktail';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('CocktailCard', () => {
    const mockCocktail = {
        idDrink: '1',
        strDrink: 'Mojito',
        strDrinkThumb: 'mojito.jpg',
        strCategory: 'Cocktail',
    } as ICocktail;

    test('renders cocktail name and image', () => {
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CocktailCard cocktail={mockCocktail} mode="home" />
            </QueryClientProvider>
        );
        expect(screen.getByText('Mojito')).toBeDefined();
        const image = screen.getByAltText('Mojito');
        expect(image.getAttribute('src')).toBe('mojito.jpg');
    });


    test('handles add to cart button click', () => {
        const setQueryDataMock = jest.fn();
        jest.spyOn(QueryClient.prototype, 'setQueryData').mockImplementation(setQueryDataMock);
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CocktailCard cocktail={mockCocktail} mode="search" />
            </QueryClientProvider>
        );
        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);
        expect(setQueryDataMock).toHaveBeenCalledWith(
            ['cocktail', 'favorites'],
            expect.any(Function)
        );
    });

    test('handles remove from cart button click', () => {
        const setQueryDataMock = jest.fn();
        // const handleRemoveFromCartToastMock = jest.fn();
        jest.spyOn(QueryClient.prototype, 'setQueryData').mockImplementation(setQueryDataMock);
        render(
            <QueryClientProvider client={new QueryClient()}>
                <CocktailCard cocktail={mockCocktail} mode="favorites" />
            </QueryClientProvider>
        );
        const removeButton = screen.getByText('Remove');
        fireEvent.click(removeButton);
        expect(setQueryDataMock).toHaveBeenCalledWith(
            ['cocktail', 'favorites'],
            expect.any(Function)
        );
        // expect(handleRemoveFromCartToastMock).toHaveBeenCalledTimes(1);
    });

    test('matches snapshot', () => {
        const { asFragment } = render(
            <QueryClientProvider client={new QueryClient()}>
                <CocktailCard cocktail={mockCocktail} mode="home" />
            </QueryClientProvider>
        );
        expect(asFragment()).toMatchSnapshot();
    });
});