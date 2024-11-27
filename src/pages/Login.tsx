import { styled } from "styled-components";
import { faComment, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin } from "../contexts/counterSlice";
import { useState } from "react";
import { g1, mainColor } from "../utils/color";
import axios from "axios";
import { logUserIn } from "../services/useUser";
import { useNavigate } from "react-router-dom";
import { phone, tablet_M, tablet_S } from "../utils/size";
import { font_sharp } from "../utils/font";
import { RootState } from "../contexts/store";
import Modal from "../components/shared/Modal";

export const LoginBox = styled.div`
  max-width: 27rem;
  max-height: 29.5rem;
  width: 60%;
  height: 80%;
  border-radius: 5px;
  background-color: white;
  overflow: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  &::-webkit-scrollbar {
    width: 0px;
  }
  @media (max-width: ${tablet_M}) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    position: relative;
    border-radius: 0;
    justify-content: center;
  }
`;

export const LoginBoxHeader = styled.div`
  width: 100%;
  padding: 1.2rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  span {
    margin: 0 1.4rem;
    &:first-child {
      font-family: ${font_sharp};
      letter-spacing: 1px;
      font-size: 1.4rem;
    }
    &:last-child {
      cursor: pointer;
      color: ${g1};
      font-size: 1.3rem;
    }
  }
  @media (max-width: ${tablet_M}) {
    position: absolute;
    top: 0;
  }
`;

export const LoginBoxMain = styled.div`
  width: 75%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: ${tablet_M}) {
    width: 60%;
  }
  @media (max-width: ${phone}) {
    width: 90%;
  }
`;

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.input<{ $isvalid: string }>`
  width: 100%;
  height: 3rem;
  border-radius: 1.3rem;
  border: 1px solid
    ${({ $isvalid }) =>
      $isvalid === "true" ? `${mainColor}` : "rgba(209, 64, 64, 0.61)"};
  outline: none;
  text-indent: 1rem;
  font-size: 1rem;
  font-family: "HakgyoansimGeurimilgi";
  margin-top: 1.2rem;
  &:first-child {
    margin-top: 2.5rem;
  }
  &:focus {
    border-width: 2px;
  }
`;

export const Button = styled.button`
  width: 100%;
  height: 3rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-family: "HakgyoansimGeurimilgi";
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-top: 2rem;
  background-color: ${mainColor};
  color: white;
`;

export const KakaoBtn = styled.div`
  width: 100%;
  height: 3.1rem;
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  cursor: pointer;
  border: none;
  margin-top: 1rem;
  background-color: yellow;
  color: black;
  font-size: 1.2rem;
`;

export const ErrorMsg = styled.span`
  color: #df4d4d;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 1rem;
`;

export const FindAccount = styled.ul`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 1.6rem 0;
  font-size: 1.1rem;
  li {
    margin: 0 0.3rem;
    cursor: pointer;
  }
  @media (max-width: ${tablet_S}) {
    font-size: 3vw;
  }
`;

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginClicked = useSelector(
    (state: RootState) => state.counter.loginClicked
  );

  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const clear = () => {
    setValue("username", "");
    setValue("password", "");
    setErrorMsg("");
  };

  const onLoginClose = () => {
    dispatch(toggleLogin());
    clear();
  };

  const onSubmitValid = () => {
    const { username, password } = getValues();
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/api/signin`, {
        username,
        password,
      })
      .then((res) => {
        const { data } = res;
        logUserIn(data);
        dispatch(toggleLogin());
        navigate("/");
        window.location.reload();
      })
      .catch((error) => setErrorMsg(error.response.data.message));
  };

  const onKakaoClicked = () => {
    const rest_api_key = process.env.REACT_APP_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Modal isActive={loginClicked} modalClose={onLoginClose}>
      <LoginBox>
        <LoginBoxHeader>
          <span>LOGIN</span>
          <span onClick={onLoginClose}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </LoginBoxHeader>
        <LoginBoxMain>
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("username", { required: true })}
              type="text"
              name="username"
              placeholder="이름을 입력해주세요"
              $isvalid={!errors?.username ? "true" : "false"}
            />
            <Input
              {...register("password", {
                required: true,
              })}
              autoComplete="off"
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요"
              $isvalid={!errors?.password ? "true" : "false"}
            />
            <ErrorMsg>{errorMsg}</ErrorMsg>
            <Button>로그인</Button>
            <KakaoBtn onClick={onKakaoClicked}>
              <FontAwesomeIcon
                icon={faComment}
                style={{ fontSize: "27px", marginRight: "12px" }}
              />
              카카오 로그인
            </KakaoBtn>
          </Form>
          <FindAccount>
            <li>아이디 찾기</li>
            <li>|</li>
            <li>비밀번호 찾기</li>
            <li>|</li>
            <li>회원가입</li>
          </FindAccount>
        </LoginBoxMain>
      </LoginBox>
    </Modal>
  );
};

export default Login;
