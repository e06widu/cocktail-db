import { render } from '@testing-library/react';
import LoadingSpinner from '../components/LoadingSpinner';

describe('LoadingSpinner', () => {
    test('renders loading spinner container', () => {
      const { container } = render(<LoadingSpinner />);
  
      const loadingSpinnerContainer = container.querySelector('.loading-spinner-container');
      expect(loadingSpinnerContainer).toBeTruthy();
    });
  
    test('renders loading spinner', () => {
      const { container } = render(<LoadingSpinner />);
  
      const loadingSpinner = container.querySelector('.loading-spinner');
      expect(loadingSpinner).toBeTruthy();
    });
  });