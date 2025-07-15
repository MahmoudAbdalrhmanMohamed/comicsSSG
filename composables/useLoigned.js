export const useLogined = () => {
  // 'counter' is the global key for the state
  const login = useState("isLogin", () => null);

  // Actions
  const setLogin = (page) => (login.value = page);
  const resetLogin = () => (login.value = null);

  return { login, resetLogin, setLogin };
};
