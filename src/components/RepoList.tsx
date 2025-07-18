import { RepoDetails } from '../types/github';

type Props = {
  repos: RepoDetails[];
};

export default function RepoList({ repos }: Props) {
  return (
    <div className="repo-section">
      {repos.map(item => (
        <div className="repo-card" key={item.id}>
          <a
            href={item.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="repo-link"
          >
            <h3>{item.name}</h3>
          </a>
          <p>{item.description || 'No description provided.'}</p>
          <span>⭐ {item.stargazers_count}</span>
        </div>
      ))}
    </div>
  );
}
