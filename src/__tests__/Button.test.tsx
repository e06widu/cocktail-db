import { fireEvent, render } from '@testing-library/react';
import Button from '../components/Button';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../components/styles.scss', () => ({}));

describe('Button', () => {
    it('renders the button correctly', () => {
      const onClickMock = jest.fn();
      const { getByText } = render(
        <Button onClick={onClickMock}>Click me</Button>
      );
      const buttonElement = getByText('Click me');
  
      expect(buttonElement).toBeInTheDocument();
      expect(buttonElement.tagName).toBe('BUTTON');
      expect(buttonElement).not.toBeDisabled();
  
      // Snapshot testing
      expect(buttonElement).toMatchSnapshot();
    });
  
    it('calls the onClick function when clicked', () => {
      const onClickMock = jest.fn();
      const { getByText } = render(
        <Button onClick={onClickMock}>Click me</Button>
      );
      const buttonElement = getByText('Click me');
  
      fireEvent.click(buttonElement);
      expect(onClickMock).toHaveBeenCalledTimes(1);
  
      // Snapshot testing
      expect(buttonElement).toMatchSnapshot();
    });
  
    it('renders the icon when provided', () => {
      const onClickMock = jest.fn();
      const { getByTestId } = render(
        <Button onClick={onClickMock} icon={<span data-testid="test-icon">Icon</span>}>Click me</Button>
      );
      const iconElement = getByTestId('test-icon');
  
      expect(iconElement).toBeInTheDocument();
  
      // Snapshot testing
      expect(iconElement).toMatchSnapshot();
    });
  
    it('disables the button when disabled prop is true', () => {
      const onClickMock = jest.fn();
      const { getByText } = render(
        <Button onClick={onClickMock} disabled={true}>Click me</Button>
      );
      const buttonElement = getByText('Click me');
  
      expect(buttonElement).toBeDisabled();
  
      // Snapshot testing
      expect(buttonElement).toMatchSnapshot();
    });
  });