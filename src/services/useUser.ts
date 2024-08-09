interface IToken {
  accessToken: string;
  refreshToken: string;
}

export var isLoggedInVar = Boolean(localStorage.getItem("accessToken"));
export const ACCESS_TOKEN = localStorage.getItem("accessToken");

export const logUserIn = (token: IToken) => {
  localStorage.setItem("accessToken", token.accessToken);
  isLoggedInVar = true;
};

export const logUserOut = () => {
  localStorage.clear();
  isLoggedInVar = false;
};
