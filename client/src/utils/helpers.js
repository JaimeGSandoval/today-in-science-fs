export const checkUser = (user, setVal) => {
  if (!user) {
    setVal((val) => !val);
    return false;
  }

  return true;
};

export const updateSessionStorage = (type, articles, title, bool) => {
  return articles.map((a) => {
    if (type === 'favorite') {
      if (a.name === title) {
        a.isFavorite = bool;
      }
      return a;
    }

    if (a.name === title) {
      a.isReadLater = bool;
    }

    return a;
  });
};

export const fetchUpdate = async (dataObj) => {
  if (dataObj.type === 'username') {
    const response = await dataObj.httpFn(dataObj);

    if (response.status === 409) {
      dataObj.setUsernameTaken(true);
      return;
    }

    if (response.ok) {
      dataObj.setCurrentUser({
        ...dataObj.currentUser,
        user_name: dataObj.newUsername,
        userId: dataObj.user_id,
      });

      localStorage.setItem(
        'currentUser',
        JSON.stringify({
          ...dataObj.currentUser,
          user_name: dataObj.newUsername,
        })
      );

      dataObj.setConfirm(true);
      dataObj.setIsOpen(false);
      return;
    }
  }

  if (dataObj.type === 'email' || dataObj.type === 'password') {
    const response = await dataObj.httpFn(dataObj);

    if (response.status === 409) {
      dataObj.setEmailTaken(true);
      return;
    }

    if (response.ok) {
      dataObj.setConfirm(true);
      dataObj.setIsOpen(false);
      return;
    }
  }
};
