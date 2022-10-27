const API = 'http://localhost:8000';

export const httpHealthCheck = async () => {
  const response = await fetch(`${API}/health-check`);
  const data = await response.json();
  console.log(data);
};

// const feed = 'https://phys.org/rss-feed/space-news/astronomy/';

export const httpFeed = async () => {
  // const response = await fetch(`${API}/news/astronomy`);
  const response = await fetch(`${API}/news/`);

  const data = await response.json();
  console.log(data);
};
