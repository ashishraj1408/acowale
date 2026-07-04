const AUTH_TOKEN_KEY = 'acowale_auth_token';

export const isAuthenticated = () => Boolean(localStorage.getItem(AUTH_TOKEN_KEY));

export const signIn = (token: string) => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const signOut = () => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
};
