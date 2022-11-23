const API = 'http://localhost:8000';

export const httpHealthCheck = async () => {
  const response = await fetch(`${API}/health-check`);
  const data = await response.json();
  console.log(data);
};

export const httpFeed = async () => {
  const response = await fetch(`${API}/news/`);

  const data = await response.json();
  console.log(data);
};

export const httpSignupUser = async (userData) => {
  try {
    const response = await fetch(`${API}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const data = await response.json();

      if (data.statusCode === 409 && data.message === 'username taken') {
        return {
          error: true,
          type: 'username',
        };
      }

      if (data.statusCode === 409 && data.message === 'email exists') {
        return {
          error: true,
          type: 'email',
        };
      }

      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.error('There was a problem signing you up', e);
  }
};

export const httpLoginUser = async (userData) => {
  try {
    const response = await fetch(`${API}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok && response.status === 400) return false;

    if (!response.ok) {
      throw new Error('Network error');
    }

    const data = await response.json();
    console.log('OK', data);

    return data;
  } catch (e) {
    console.error('There was a problem signing you up', e);
  }
};
