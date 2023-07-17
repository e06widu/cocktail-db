import { render } from '@testing-library/react';
import Toast from '../components/Toast';

jest.useFakeTimers();

describe('Toast', () => {
    test('renders toast with message', () => {
      const message = 'Toast message';
  
      const { getByText } = render(<Toast message={message} />);
  
      expect(getByText(message)).toBeTruthy();
    });
  

  });