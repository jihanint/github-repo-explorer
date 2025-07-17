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
    setLoading(true);
    setError('');
    setLastQuery(name);
    try {
      const result = await fetchUsers(name);
      setUsers(result);
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
      {lastQuery && <p className="result-label">Showing users for "{lastQuery}"</p>}
      {error && <p className="error-text">{error}</p>}
      {loading && <p>Loading...</p>}
      <UserSelect users={users} onExpand={expandRepos} />
    </div>
  );
}

export default App;
