export const saveToken = (token: string) => {
  document.cookie = `token=${token}; path=/`;
};

export const logout = () => {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};