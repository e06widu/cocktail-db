import { render } from '@testing-library/react';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();
jest.mock('../components/Header', () => () => <div data-testid="mocked-header">Mocked Header</div>);

describe('Layout', () => {
    test('renders Header component', () => {
        const { container } = render(
          <QueryClientProvider client={queryClient}>
            <Router>
              <Layout>
                <div data-testid="child">Child Component</div>
              </Layout>
            </Router>
          </QueryClientProvider>
        );
    
        expect(container.firstChild).toMatchSnapshot();
      });
});