import { DevAccount, RepoDetails } from '../types/github';

const API_ROOT = 'https://api.github.com';

export async function fetchUsers(query: string): Promise<DevAccount[]> {
  const res = await fetch(`${API_ROOT}/search/users?q=${query}&per_page=5`);
  if (!res.ok) throw new Error('Failed to search users');
  const json = await res.json();
  return json.items || [];
}

export async function fetchRepos(username: string): Promise<RepoDetails[]> {
  const res = await fetch(`${API_ROOT}/users/${username}/repos`);
  if (!res.ok) throw new Error('Failed to fetch repos');
  return res.json();
}
