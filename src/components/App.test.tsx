import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn((url: string) =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          items: [
            { id: 1, login: 'jihan', avatar_url: 'https://example.com/jihan.png' },
            { id: 2, login: 'jihan123', avatar_url: 'https://example.com/jihan123.png' },
          ],
        }),
    })
  ) as jest.Mock;
});

describe('App integration', () => {
  it('shows filtered GitHub users after searching', async () => {
    render(<App />);
    const input = screen.getByPlaceholderText(/enter username/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'jihan' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(screen.getByText(/Showing users for "jihan"/)).toBeInTheDocument();
    });

    expect(screen.getByText('jihan')).toBeInTheDocument();
    expect(screen.getByText('jihan123')).toBeInTheDocument();
  });
});
