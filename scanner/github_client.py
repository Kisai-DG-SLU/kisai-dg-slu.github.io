import os
import requests

GITHUB_API_URL = "https://api.github.com"

def get_github_token():
    token = os.environ.get("GITHUB_TOKEN")
    if not token:
        # In a real scenario, this would raise an error or be handled more gracefully
        print("Warning: GITHUB_TOKEN environment variable not set. GitHub API requests may be unauthenticated or fail.")
    return token

def get_repo_info(repo_owner: str, repo_name: str) -> dict | None:
    token = get_github_token()
    headers = {"Authorization": f"token {token}"} if token else {}
    
    url = f"{GITHUB_API_URL}/repos/{repo_owner}/{repo_name}"
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f"Error fetching repo {repo_owner}/{repo_name}: {response.status_code} - {response.text}")
        return None

# You can add more functions here for other GitHub API interactions if needed.
