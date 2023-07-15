import { render } from '@testing-library/react';
import Toast from '../components/Toast';

jest.useFakeTimers();

describe('Toast', () => {
    test('renders toast with message', () => {
      const message = 'Toast message';
  
      const { getByText } = render(<Toast message={message} />);
  
      // Check if the toast message is rendered
      expect(getByText(message)).toBeTruthy();
    });
  
    // test('renders toast for specified duration', () => {
    //   const duration = 3000;
  
    //   const { container } = render(<Toast message="Toast message" duration={duration} />);
  
    //   // Check if the toast is initially visible
    //   expect(container.firstChild).toMatchSnapshot();
  
    //   // Advance timers by the duration
    //   jest.advanceTimersByTime(duration);
  
    //   // Check if the toast is no longer visible after the specified duration
    //   expect(container.firstChild).toMatchSnapshot();
    // });
  });