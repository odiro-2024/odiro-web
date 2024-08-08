import { styled } from "styled-components";
import { faComment, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toggleLogin, toggleSignup } from "../counterSlice";
import { useRef, useState } from "react";
import axios from "axios";
import {
  Button,
  ErrorMsg,
  Form,
  Input,
  KakaoBtn,
  LoginBoxContent,
  LoginBoxHeader,
  Overlay,
  overlayVariants,
  SearchDiv,
} from "./Login";

const EnrollBox = styled.div`
  max-width: 31rem;
  width: 60%;
  max-height: 40rem;
  height: 80%;
  border-radius: 5px;
  background-color: white;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
  @media (max-width: 760px) {
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border-radius: 0;
  }
`;

const EnrollInput = styled(Input)`
  &:first-child {
    margin-top: 3rem;
  }
  @media (max-width: 760px) {
    &:first-child {
      margin-top: 5rem;
    }
  }
`;

interface FormData {
  username: string;
  password: string;
  password2: string;
  email: string;
}

const Signup = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      dispatch(toggleSignup());
    }
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitValid = () => {
    const { username, password, email } = getValues();
    axios
      .post("/api/signup", {
        username,
        password,
        email,
      })
      .then((res) => {
        console.log(res.data);
        dispatch(toggleSignup());
        dispatch(toggleLogin());
      })
      .catch((error) => setErrorMsg(error.message));
  };

  const rest_api_key = process.env.REACT_APP_REST_API_KEY;
  const redirect_uri = process.env.REACT_APP_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const onKakaoClicked = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <Overlay
      variants={overlayVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      ref={modalRef}
      onClick={(e: any) => modalOutSideClick(e)}
    >
      <EnrollBox>
        <LoginBoxHeader>
          <span>SignUp</span>
          <span onClick={() => dispatch(toggleSignup())}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </LoginBoxHeader>
        <LoginBoxContent>
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <EnrollInput
              {...register("username", { required: true })}
              type="text"
              name="username"
              placeholder="이름을 입력해주세요"
              $isvalid={!errors?.username ? "true" : "false"}
            />
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

            <EnrollInput
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              $isvalid={!errors?.email ? "true" : "false"}
            />
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
          <SearchDiv>
            <span>아이디 찾기</span>
            <span>|</span>
            <span>비밀번호 찾기</span>
            <span>|</span>
            <span>로그인</span>
          </SearchDiv>
        </LoginBoxContent>
      </EnrollBox>
    </Overlay>
  );
};

export default Signup;
