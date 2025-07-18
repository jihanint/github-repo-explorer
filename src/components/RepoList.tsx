import { RepoDetails } from '../types/github';

type Props = {
  repos: RepoDetails[];
};

export default function RepoList({ repos }: Props) {
  return (
    <div className="repo-section">
      {repos.map(item => (
        <div className="repo-card" key={item.id}>
          <h3>
            <a
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="repo-link"
            >
              {item.name}
            </a>
          </h3>
          <p>{item.description || 'No description provided.'}</p>
          <span>⭐ {item.stargazers_count}</span>
        </div>
      ))}
    </div>
  );
}
