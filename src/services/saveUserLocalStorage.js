export const setUsersLocalStorage = (obj) => {
  const localUsers = JSON.parse(localStorage.getItem('usersResults')) || [];

  localStorage.setItem('usersResults', JSON.stringify([...localUsers, obj]));
};
