const BASE_URL = "https://jsonplaceholder.typicode.com";

export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};

export const getPosts = async () => {
  const response = await fetch(`${BASE_URL}/posts`);

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};
