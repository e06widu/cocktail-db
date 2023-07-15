import { render } from '@testing-library/react';
import Home from '../pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

jest.mock('../components/Header', () => () => <div data-testid="mocked-header">Mocked Header</div>);

jest.mock('../components/LoadingSpinner', () => ({
    __esModule: true,
    default: jest.fn().mockReturnValue(<div data-testid="mocked-loading-spinner">Mocked LoadingSpinner</div>),
}));


test('renders "Random Cocktails" text', () => {
    const { getByText } = render(
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    );

    // Check if the "Random Cocktails" text is rendered
    expect(getByText('Random Cocktails')).toBeTruthy();
    expect(getByText('Refresh')).toBeTruthy();
});

test('renders loading spinner when loading', () => {
    const { getByTestId } = render(
        <QueryClientProvider client={queryClient}>
            <Home />
        </QueryClientProvider>
    );

    expect(getByTestId('mocked-loading-spinner')).toBeTruthy();
});
