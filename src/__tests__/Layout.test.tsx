import { render } from '@testing-library/react';
import Layout from '../components/Layout';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter as Router } from 'react-router-dom';

const queryClient = new QueryClient();

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
    
        // Verify the rendered component matches the snapshot
        expect(container.firstChild).toMatchSnapshot();
      });
});