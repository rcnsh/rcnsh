export type Repo = {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
};

export default async function getRepos() {
  const username = "rcnsh";
  const res = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      Authorization: `token ${process.env.GITHUB_TOKEN}`,
    },
  });
  const repos = (await res.json()) as Repo[];

  const repoNamesToInclude = [
    "rcnsh",
    "notes",
    "virtue-gymnastics-website",
    "RaspberryPyGame",
    "Edexcel-Large-Data-Set-Analysis",
    "fast_inverse_square_root",
  ];

  return repos
    .map((repo) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
    }))
    .filter((repo: Repo) => repoNamesToInclude.includes(repo.name));
}
