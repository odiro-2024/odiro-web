import { styled } from "styled-components";
import {
  faComment,
  faX,
  faCircleCheck as faCircleCheckSolid,
} from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, toggleSignup } from "../contexts/counterSlice";
import { useState } from "react";
import axios from "axios";
import {
  Button,
  ErrorMsg,
  Form,
  Input,
  KakaoBtn,
  LoginBoxMain,
  LoginBoxHeader,
  FindAccount,
  LoginBox,
} from "./Login";
import { tablet_M } from "../utils/size";
import { RootState } from "../contexts/store";
import Modal from "../components/shared/Modal";
import { mainColor } from "../utils/color";

const EnrollBox = styled(LoginBox)<{ $emailVerifing: boolean }>`
  max-height: ${(props) => (props.$emailVerifing ? "40rem" : "36rem")};
  max-width: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: ${tablet_M}) {
    max-height: 100%;
    max-width: 100%;
    justify-content: center;
  }
`;

const InputBox = styled.div`
  display: flex;
  height: 2.9rem;
  border-radius: 1.3rem;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  margin-top: 1.1rem;
  &:first-child {
    margin-top: 2.5rem;
  }
`;

const EnrollInput = styled(Input)`
  width: 100%;
  height: 2.8rem;
  &:first-child {
    margin: 0;
  }
`;

const DuplicateCheck = styled.div`
  /* position: absolute;
  width: 55px;
  height: calc(100% + 2px);
  top: -1px;
  right: 0;
  border-radius: 0 1.3rem 1.3rem 0;
  font-size: 0.9em;
  font-weight: bold;
  background-color: ${mainColor};
  text-align: center;
  align-content: center;
  color: white;
  cursor: pointer; */
  position: absolute;
  right: 0.5rem;
  font-size: 1.8rem;
  color: ${mainColor};
  cursor: pointer;
`;

interface FormData {
  username: string;
  password: string;
  password2: string;
  email: string;
  emailVerify: string;
}

const Signup = () => {
  const [errorMsg, setErrorMsg] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [emailVerifing, setEmailVerifing] = useState(false);
  const [emailVerifyValid, setEmailVerifyValid] = useState(false);
  const dispatch = useDispatch();
  const enrollClicked = useSelector(
    (state: RootState) => state.counter.signupClicked
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
    setValue("password2", "");
    setValue("email", "");
    setValue("emailVerify", "");
    setUsernameValid(false);
    setEmailValid(false);
    setEmailVerifing(false);
  };

  const onSignupClose = () => {
    dispatch(toggleSignup());
    clear();
  };

  const onUsernameCheck = () => {
    if (usernameValid) return;
    const { username } = getValues();
    console.log(username);
    setUsernameValid(true);
    //
  };

  const onEmailCheck = () => {
    if (emailValid) return;
    //
    setEmailValid(true);
    setEmailVerifyValid(false);
    setEmailVerifing(true);
    //
  };

  const onEmailVerifyCheck = () => {
    if (emailVerifyValid) return;
    const { emailVerify } = getValues();
    console.log(emailVerify);
    setEmailVerifyValid(true);
    //
  };

  const onSubmit = () => {
    const { username, password, password2, email } = getValues();
    if (password !== password2) {
      setErrorMsg("비밀번호가 다릅니다.");
      return;
    }
    axios
      .post("/api/signup", {
        username,
        password,
        email,
      })
      .then(() => {
        dispatch(toggleSignup());
        dispatch(toggleLogin());
        clear();
      })
      .catch((error) => setErrorMsg(error.message));
  };

  const onKakaoClicked = () => {
    const rest_api_key = process.env.REACT_APP_REST_API_KEY;
    const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Modal active={enrollClicked} modalClose={onSignupClose}>
      <EnrollBox $emailVerifing={emailVerifing}>
        <LoginBoxHeader>
          <span>SignUp</span>
          <span onClick={onSignupClose}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </LoginBoxHeader>
        <LoginBoxMain>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <InputBox>
              <EnrollInput
                {...register("username", { required: true })}
                type="text"
                name="username"
                placeholder="이름을 입력해주세요"
                $isvalid={!errors?.username ? "true" : "false"}
                onChange={() => setUsernameValid(false)}
              />
              <DuplicateCheck onClick={onUsernameCheck}>
                {usernameValid ? (
                  <FontAwesomeIcon icon={faCircleCheckSolid} />
                ) : (
                  <FontAwesomeIcon icon={faCircleCheckRegular} />
                )}
              </DuplicateCheck>
            </InputBox>
            <InputBox>
              <EnrollInput
                {...register("password", {
                  required: true,
                })}
                autoComplete="off"
                type="password"
                name="password"
                placeholder="비밀번호를 입력해주세요"
                $isvalid={!errors?.password ? "true" : "false"}
              />
            </InputBox>
            <InputBox>
              <EnrollInput
                {...register("password2", {
                  required: true,
                })}
                autoComplete="off"
                type="password"
                name="password2"
                placeholder="비밀번호를 다시 입력해주세요"
                $isvalid={!errors?.password2 ? "true" : "false"}
              />
            </InputBox>
            <InputBox>
              <EnrollInput
                {...register("email", { required: true })}
                type="email"
                name="email"
                placeholder="이메일을 입력해주세요"
                $isvalid={!errors?.email ? "true" : "false"}
                onChange={() => setEmailValid(false)}
              />
              <DuplicateCheck onClick={onEmailCheck}>
                {emailValid ? (
                  <FontAwesomeIcon icon={faCircleCheckSolid} />
                ) : (
                  <FontAwesomeIcon icon={faCircleCheckRegular} />
                )}
              </DuplicateCheck>
            </InputBox>
            {emailVerifing && (
              <InputBox>
                <EnrollInput
                  {...register("emailVerify", { required: true })}
                  type="text"
                  name="emailVerify"
                  placeholder="인증번호를 입력해주세요"
                  $isvalid={!errors?.emailVerify ? "true" : "false"}
                  onChange={() => setEmailVerifyValid(false)}
                />
                <DuplicateCheck onClick={onEmailVerifyCheck}>
                  {emailVerifyValid ? (
                    <FontAwesomeIcon icon={faCircleCheckSolid} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleCheckRegular} />
                  )}
                </DuplicateCheck>
              </InputBox>
            )}
            <ErrorMsg>{errorMsg}</ErrorMsg>
            <Button>회원가입</Button>
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
            <li>로그인</li>
          </FindAccount>
        </LoginBoxMain>
      </EnrollBox>
    </Modal>
  );
};

export default Signup;
