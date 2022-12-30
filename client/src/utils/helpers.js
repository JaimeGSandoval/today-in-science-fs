export const checkUser = (user, val, setVal) => {
  if (!user) {
    setVal(!val);
    return;
  }
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
