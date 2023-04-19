// neste arquivo estão funcões relacionada ao fetch do token e seu envio pro localStorage

const fetchToken = async () => (await fetch('https://opentdb.com/api_token.php?command=request')).json();

export const saveTokenInLocalStorage = async () => {
  const { token } = await fetchToken();
  if (token) JSON.stringify(localStorage.setItem('token', token));
};
