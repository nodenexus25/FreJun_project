const API_BASE = "https://jsonplaceholder.typicode.com";

export const fetchComments = async () => {
  const res = await fetch(`${API_BASE}/comments`);
  return await res.json();
};

export const fetchPosts = async () => {
  const res = await fetch(`${API_BASE}/posts`);
  return await res.json();
};
