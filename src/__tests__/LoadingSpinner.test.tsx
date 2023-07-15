import { render } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner';

describe('LoadingSpinner', () => {
    test('renders loading spinner container', () => {
      const { container } = render(<LoadingSpinner />);
  
      // Check if the loading spinner container is rendered
      const loadingSpinnerContainer = container.querySelector('.loading-spinner-container');
      expect(loadingSpinnerContainer).toBeTruthy();
    });
  
    test('renders loading spinner', () => {
      const { container } = render(<LoadingSpinner />);
  
      // Check if the loading spinner is rendered
      const loadingSpinner = container.querySelector('.loading-spinner');
      expect(loadingSpinner).toBeTruthy();
    });
  });