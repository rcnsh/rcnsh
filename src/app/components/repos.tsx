import getRepos from "@/app/components/github";
import type { Repo } from "@/app/components/github";
import Link from "next/link";

function Skeleton() {
  return (
    <div className="space-y-4">
      <div className="h-6 w-2/6 rounded-lg bg-gray-500" />
      <div className="h-4 w-1/6 rounded-lg bg-gray-500" />
      <div className="h-4 w-full rounded-lg bg-gray-500" />
      <div className="h-4 w-4/6 rounded-lg bg-gray-500" />
    </div>
  );
}

export function ReposSkeleton() {
  return (
    <div className="space-y-6">
      <div className={`h-7 w-2/5 rounded-lg bg-gray-500 `} />
      <div className="space-y-8">
        <Skeleton />
        <Skeleton />
      </div>
    </div>
  );
}

export default async function Repos() {
  const repos = (await getRepos()) as Repo[];
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 2xl:grid-cols-3">
      {repos.map((repo) => (
        <div key={repo.name} className="flex-col rounded-xl p-6 shadow-md">
          <Link
            className={"text-[#737dbb] underline hover:text-[#cdc8c2]"}
            href={repo.html_url}
          >
            {repo.name}
          </Link>
          <br />
          <span className={"text-[#cdc8c2]"}>{repo.description}</span>
        </div>
      ))}
    </div>
  );
}
