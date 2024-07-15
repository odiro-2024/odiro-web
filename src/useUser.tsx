export var isLoggedInVar = Boolean(localStorage.getItem("accessToken"));

interface IToken {
  accessToken: string;
  refreshToken: string;
}

export const logUserIn = (token: IToken) => {
  localStorage.setItem("accessToken", token.accessToken);
  localStorage.setItem("refreshToken", token.refreshToken);
  isLoggedInVar = true;
};

export const logUserOut = () => {
  localStorage.clear();
  isLoggedInVar = false;
};

const useUser = () => {};

export default useUser;
