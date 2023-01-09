const API = 'http://localhost:8000';

export const httpHealthCheck = async () => {
  const response = await fetch(`${API}/health-check`);
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
      const errorResponse = await response.json();

      if (errorResponse.statusCode === 409 && errorResponse.message === 'username taken') {
        return {
          error: true,
          type: 'username',
        };
      }

      if (errorResponse.statusCode === 409 && errorResponse.message === 'email exists') {
        return {
          error: true,
          type: 'email',
        };
      }
    }

    const signUpResponse = await response.json();

    return signUpResponse;
  } catch (e) {
    console.error(e.message);
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
      credentials: 'include',
    });

    if (!response.ok && response.status === 400) return false;

    if (!response.ok) {
      throw new Error('There was a problem logging you in.');
    }

    const userDataResponse = await response.json();

    return userDataResponse;
  } catch (e) {
    console.error(e.message);
  }
};

export const httpLogoutUser = async () => {
  try {
    const response = await fetch(`${API}/auth/logout`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('There was a problem logging you out.');
    }

    return response;
  } catch (e) {
    console.error(e.message);
  }
};

export const httpAddArticle = async (articleData) => {
  try {
    const response = await fetch(`${API}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error('There was a problem adding the article to list.');
    }

    return response;
  } catch (e) {
    console.error(e.message);
  }
};

export const httpDeleteArticle = async (articleData) => {
  try {
    const response = await fetch(`${API}/articles/delete-article`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(articleData),
    });

    if (!response.ok) {
      throw new Error('There was a problem deleting the article to your list.');
    }

    return response;
  } catch (e) {
    console.error(e.message);
  }
};

export const httpUpdateUsername = async (usernameObj) => {
  const { userId } = usernameObj;

  try {
    const response = await fetch(`${API}/settings/update-username/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(usernameObj),
    });

    if (!response.ok) {
      throw new Error('There was a problem updating your username.');
    }

    return response;
  } catch (e) {
    console.error(e.message);
  }
};

export const httpUpdateEmailRequest = async (emailObj) => {
  const { userId } = emailObj;

  try {
    const response = await fetch(`${API}/settings/update-email-request/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(emailObj),
    });

    if (!response.ok) {
      throw new Error('There was a problem updating your email.');
    }

    return response;
  } catch (e) {
    console.error(e.message);
  }
};

export const httpUpdatePasswordRequest = async (emailObj) => {
  const { userId } = emailObj;

  try {
    const response = await fetch(`${API}/settings/update-password-request/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(emailObj),
    });

    if (!response.ok) {
      throw new Error('There was a problem updating your password.');
    }

    return response;
  } catch (e) {
    console.error(e.message);
  }
};

export const httpDeleteUserAccount = async (userId) => {
  try {
    const response = await fetch(`${API}/users/delete-user/${userId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('There was a problem deleting your account.');
    }

    return response;
  } catch (e) {
    console.error(e.message);
  }
};
