export const checkUser = (user, val, setVal) => {
  if (!user) {
    setVal(!val);
    return;
  }
};
