export interface DevAccount {
  id: number;
  login: string;
  avatar_url: string;
}

export interface RepoDetails {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
}
