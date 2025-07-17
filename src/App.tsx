import { useState } from 'react';
import SearchBox from './components/SearchBox';
import UserSelect from './components/UserSelect';
import { fetchUsers, fetchRepos } from './api/gitFetch';
import { DevAccount, RepoDetails } from './types/github';
import './styles/layout.css';

function App() {
  const [users, setUsers] = useState<DevAccount[]>([]);
  const [lastQuery, setLastQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchUsers = async (name: string) => {
    const cleaned = name.trim();
    const isValid = /^[a-zA-Z0-9]/.test(cleaned);

    setLastQuery(cleaned);
    setUsers([]);
    setError('');

    if (!cleaned || !isValid) {
      setError('Please input a valid username format.');
      return;
    }

    setLoading(true);
    try {
      const result = await fetchUsers(cleaned);
      const filtered = result
        .filter(user => user.login.toLowerCase().includes(cleaned.toLowerCase()))
        .slice(0, 5); // Max 5 matches
      setUsers(filtered);

      if (filtered.length === 0) {
        setError(`No record found for "${cleaned}"`);
      }
    } catch {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const expandRepos = async (username: string) => {
    try {
      return await fetchRepos(username);
    } catch {
      return [];
    }
  };

  return (
    <div className="page-container">
      <h1>GitHub Repo Finder</h1>
      <SearchBox onSubmit={searchUsers} />
      {error && <p className="error-text">{error}</p>}
      {!error && users.length > 0 && (
        <p className="result-label">Showing users for "{lastQuery}"</p>
      )}
      {loading && <p>Loading...</p>}
      <UserSelect users={users} onExpand={expandRepos} />
    </div>
  );
}

export default App;
