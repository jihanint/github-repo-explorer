# GitHub Repo Explorer

A simple React + TypeScript app that lets you search for GitHub users and view their public repositories. Built as a technical test project, this tool demonstrates API integration, conditional rendering, and user-friendly UI/UX using GitHub’s REST API.

## Features

- Search GitHub users by username (up to 5 matches)
- Displays avatars and usernames
- Click on a user to view their repositories
- Shows repo names, descriptions, and star counts
- Mobile-friendly layout with responsive styling
- Error handling and loading states included

## Preview

![App Preview](public/preview.png)

## Tech Stack

- [React](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [GitHub REST API v3](https://docs.github.com/en/rest)
- CSS (custom styles, no frameworks)

## Getting Started

Clone the repo and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/github-repo-explorer.git
cd github-repo-explorer
npm install

## Tests

Includes unit and integration tests written with React Testing Library:

- `SearchBox.test.tsx`: tests user input behavior
- `App.test.tsx`: tests full search flow and GitHub user display
- `UserSelect.test.tsx`: tests expanding a user to reveal repositories

Run tests with:

```bash
npm test
