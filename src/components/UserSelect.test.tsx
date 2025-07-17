import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserSelect from './UserSelect';
import { RepoDetails, DevAccount } from '../types/github';

const mockUsers: DevAccount[] = [
  {
    id: 1,
    login: 'jihan',
    avatar_url: 'https://example.com/jihan.png',
  },
];

const mockRepos: RepoDetails[] = [
  {
    id: 101,
    name: 'test-repo',
    html_url: 'https://github.com/jihan/test-repo',
    description: 'A test repo',
    stargazers_count: 42,
  },
];

describe('UserSelect component', () => {
  it('expands user and displays repositories on dropdown click', async () => {
    const expandMock = jest.fn().mockResolvedValue(mockRepos);

    render(<UserSelect users={mockUsers} onExpand={expandMock} />);

    const toggleButton = screen.getByText('jihan');
    fireEvent.click(toggleButton);

    expect(expandMock).toHaveBeenCalledWith('jihan');

    await waitFor(() => {
      expect(screen.getByText('test-repo')).toBeInTheDocument();
      expect(screen.getByText('A test repo')).toBeInTheDocument();
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });
});
