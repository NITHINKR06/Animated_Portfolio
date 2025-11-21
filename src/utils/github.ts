import { Project } from "../data/portfolio";

interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  private: boolean;
}

/**
 * Fetches repositories from GitHub API for a given username
 * @param username - GitHub username
 * @param repoNames - Optional array of repository names to include (if provided, only these repos will be fetched)
 * @returns Array of Project objects
 */
export async function fetchGitHubProjects(
  username: string,
  repoNames?: string[]
): Promise<Project[]> {
  try {
    const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100&type=all`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch repositories: ${response.statusText}`);
    }

    const repos: GitHubRepo[] = await response.json();

    // Filter out forks, archived, disabled, and private repos
    let filteredRepos = repos.filter(
      (repo) => !repo.fork && !repo.archived && !repo.disabled && !repo.private
    );

    // If repoNames is provided, filter to only include those repositories
    if (repoNames && repoNames.length > 0) {
      filteredRepos = filteredRepos.filter((repo) =>
        repoNames.some((name) => repo.name.toLowerCase() === name.toLowerCase())
      );
    }

    // Transform GitHub repos to Project format
    const projects: Project[] = filteredRepos.map((repo) => {
      // Extract technologies from topics and language
      const technologies: string[] = [];
      if (repo.language) {
        technologies.push(repo.language);
      }
      // Add common topics as technologies (filter out generic ones)
      const techTopics = repo.topics.filter(
        (topic) =>
          !["portfolio", "website", "demo", "example", "test"].includes(
            topic.toLowerCase()
          )
      );
      technologies.push(...techTopics.slice(0, 5)); // Limit to 5 additional techs

      // Generate description from repo description or create a better default
      const description =
        repo.description ||
        `A ${repo.language || "full-stack"} application built with modern technologies and best practices.`;

      // Determine status based on last update
      // Default to "completed" - only mark as "in-progress" if very recently updated
      const lastUpdate = new Date(repo.pushed_at);
      const daysSinceUpdate = (Date.now() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24);
      let status: "completed" | "in-progress" | "planned" = "completed";
      
      // Only mark as "in-progress" if updated within the last 7 days
      // This is more conservative and accurate for most projects
      if (daysSinceUpdate < 2) {
        status = "in-progress";
      } else {
        // Everything else is considered completed
        status = "completed";
      }

      // Better title formatting - handle camelCase, PascalCase, kebab-case, and snake_case
      const formatTitle = (name: string): string => {
        // Handle camelCase and PascalCase
        if (/[a-z][A-Z]/.test(name)) {
          return name
            .replace(/([a-z])([A-Z])/g, "$1 $2")
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
            .join(" ");
        }
        // Handle kebab-case and snake_case
        return name
          .split(/[-_]/)
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
          .join(" ");
      };

      return {
        id: repo.id.toString(),
        title: formatTitle(repo.name),
        description,
        technologies: [...new Set(technologies)].slice(0, 6), // Limit to 6 technologies max
        githubUrl: repo.html_url,
        liveUrl: repo.homepage || undefined,
        status,
      };
    });

    return projects;
  } catch (error) {
    console.error("Error fetching GitHub projects:", error);
    return [];
  }
}

/**
 * Merges GitHub projects with existing projects, avoiding duplicates
 * @param existingProjects - Projects from portfolio data
 * @param githubProjects - Projects fetched from GitHub
 * @returns Merged array of projects
 */
export function mergeProjects(
  existingProjects: Project[],
  githubProjects: Project[]
): Project[] {
  const existingUrls = new Set(
    existingProjects.map((p) => p.githubUrl?.toLowerCase())
  );

  // Filter out GitHub projects that already exist
  const newGitHubProjects = githubProjects.filter(
    (p) => !existingUrls.has(p.githubUrl?.toLowerCase())
  );

  // Combine existing projects with new GitHub projects
  return [...existingProjects, ...newGitHubProjects];
}

/**
 * Fetches README content from a GitHub repository
 * @param githubUrl - Full GitHub repository URL
 * @returns README content as markdown string, or null if not found
 */
export async function fetchReadme(githubUrl: string): Promise<string | null> {
  try {
    // Extract owner and repo from URL (e.g., https://github.com/owner/repo)
    const urlParts = githubUrl.replace("https://github.com/", "").split("/");
    if (urlParts.length < 2) {
      return null;
    }
    
    const owner = urlParts[0];
    const repo = urlParts[1];
    
    // Try common README filenames
    const readmeFiles = ["README.md", "readme.md", "Readme.md", "README.MD"];
    
    for (const filename of readmeFiles) {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${owner}/${repo}/contents/${filename}`
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.content && data.encoding === "base64") {
            // Decode base64 content
            const decoded = atob(data.content);
            return decoded;
          }
        }
      } catch (error) {
        // Continue to next filename
        continue;
      }
    }
    
    return null;
  } catch (error) {
    console.error("Error fetching README:", error);
    return null;
  }
}

