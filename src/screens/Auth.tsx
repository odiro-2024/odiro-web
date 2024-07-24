import { useEffect } from "react";
import axios from "axios";
import { toggleLogin } from "../counterSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logUserIn } from "../useUser";

const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    const grantType = "authorization_code";
    const REST_API_KEY = process.env.REACT_APP_REST_API_KEY;
    const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
    axios
      .post(
        `https://kauth.kakao.com/oauth/token?grant_type=${grantType}&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${code}`,
        {
          headers: {
            "Content-type": "application/x-www-form-urlencoded;",
          },
        }
      )
      .then((res: any) => {
        const { access_token: ACCESS_TOKEN } = res.data;
        axios
          .get(`https://kapi.kakao.com/v2/user/me`, {
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
              "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
            },
          })
          .then((res: any) => {
            const {
              kakao_account: { email },
            } = res.data;
            const {
              kakao_account: {
                profile: { nickname, profile_image_url },
              },
            } = res.data;
            console.log(email, nickname, profile_image_url);
          });
      })
      .catch((Error: any) => {
        console.log(Error);
      });
  });

  return <></>;
};

export default Auth;
