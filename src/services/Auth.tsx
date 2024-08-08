import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { logUserIn } from "../useUser";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");
    axios
      .get(`/kakao`, {
        params: { code },
      })
      .then((res) => {
        const { data } = res;
        logUserIn(data);
        navigate("/");
      });
  });

  return <></>;
};

export default Auth;
