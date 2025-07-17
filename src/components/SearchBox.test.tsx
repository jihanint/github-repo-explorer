import { render, screen, fireEvent } from '@testing-library/react';
import SearchBox from './SearchBox';

describe('SearchBox', () => {
  it('renders input and button', () => {
    render(<SearchBox onSubmit={() => {}} />);
    expect(screen.getByPlaceholderText(/enter username/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls onSubmit when Search button is clicked', () => {
    const mockSubmit = jest.fn();
    render(<SearchBox onSubmit={mockSubmit} />);

    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'jihan' } });
    fireEvent.click(button);

    expect(mockSubmit).toHaveBeenCalledWith('jihan');
  });
});
