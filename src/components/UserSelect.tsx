import { useState } from 'react';
import { DevAccount, RepoDetails } from '../types/github';

type Props = {
  users: DevAccount[];
  onExpand: (username: string) => Promise<RepoDetails[]>;
};

export default function UserSelect({ users, onExpand }: Props) {
  const [expandedUser, setExpandedUser] = useState<string | null>(null);
  const [repoMap, setRepoMap] = useState<Record<string, RepoDetails[]>>({});

  const handleToggle = async (username: string) => {
    if (expandedUser === username) {
      setExpandedUser(null);
      return;
    }
    if (!repoMap[username]) {
      const repos = await onExpand(username);
      setRepoMap(prev => ({ ...prev, [username]: repos }));
    }
    setExpandedUser(username);
  };

  const formatStar = (count: number) => {
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
 };


  return (
    <div className="user-section">
      {users.map(user => (
        <div key={user.id} className="user-entry">
          <div className="user-header" onClick={() => handleToggle(user.login)}>
            <img src={user.avatar_url} alt={user.login} />
            <span>{user.login}</span>
            <span className="arrow">{expandedUser === user.login ? '⌃' : '⌄'}</span>
          </div>

          {expandedUser === user.login && repoMap[user.login] && (
            <div className="repo-list-expanded">
              {repoMap[user.login].map(repo => (
                <div key={repo.id} className="repo-row">
                    <div className="repo-meta">
                        <strong>{repo.name}</strong>
                        <p>{repo.description || 'No description'}</p>
                    </div>
                    <div className="repo-stars">
                        <span>{formatStar(repo.stargazers_count)}</span>
                        <span className="star">⭐</span>
                    </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
