import { styled } from "styled-components";
import { motion } from "framer-motion";
import { faComment, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../counterSlice";
import { useRef, useState } from "react";
import { mainColor } from "../color";
import axios from "axios";
import { logUserIn } from "../useUser";
import { useNavigate } from "react-router-dom";

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
`;

const LoginBox = styled.div`
  max-width: 500px;
  width: 60%;
  max-height: 540px;
  height: 80%;
  border-radius: 5px;
  background-color: white;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const LoginBoxHeader = styled.div`
  width: 100%;
  height: 65px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(0, 0, 0, 0.8);
  span {
    margin: 0 23px;
    &:first-child {
      font-family: "Times New Roman", Times, serif;
      letter-spacing: 1px;
      font-size: 21px;
    }
    &:last-child {
      cursor: pointer;
      opacity: 0.9;
      font-size: 20px;
    }
  }
`;

const LoginBoxContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input<{ $isvalid: string }>`
  width: 75%;
  height: 50px;
  border-radius: 20px;
  border: 1px solid
    ${({ $isvalid }) =>
      $isvalid === "true" ? `${mainColor}` : "rgba(209, 64, 64, 0.61)"};
  outline: none;
  text-indent: 15px;
  font-size: 15px;
  margin-top: 20px;
  &:first-child {
    margin-top: 70px;
  }
  &:focus {
    border-width: 2px;
  }
`;

const Button = styled.button`
  width: 75%;
  height: 50px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  margin-top: 50px;
  background-color: ${mainColor};
  color: white;
`;

const KakaoBtn = styled.div`
  width: 75%;
  height: 50px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  margin-top: 50px;
  background-color: ${mainColor};
  color: white;
  margin-top: 15px;
  background-color: yellow;
  color: black;
  font-size: 18px;
`;

const ErrorMsg = styled.span`
  color: #df4d4d;
  font-size: 15px;
  font-weight: 600;
  margin-top: 10px;
`;

const SearchDiv = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 40px 0 25px 0;
  font-size: 15px;
  span {
    margin: 0 5px;
    cursor: pointer;
  }
`;

const overlayVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

interface FormData {
  nickname: string;
  password: string;
}

const Login = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState("");

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      dispatch(toggleLogin());
    }
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitValid = () => {
    const { nickname, password } = getValues();
    axios
      .post("/api/signin", {
        nickname,
        password,
      })
      .then((res) => {
        const { data } = res;
        logUserIn(data);
        dispatch(toggleLogin());
        navigate("/");
        window.location.reload();
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
      <LoginBox>
        <LoginBoxHeader>
          <span>LOGIN</span>
          <span onClick={() => dispatch(toggleLogin())}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </LoginBoxHeader>
        <LoginBoxContent>
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("nickname", { required: true })}
              type="text"
              name="nickname"
              placeholder="아이디를 입력해주세요"
              $isvalid={!errors?.nickname ? "true" : "false"}
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
          <SearchDiv>
            <span>아이디 찾기</span>
            <span>|</span>
            <span>비밀번호 찾기</span>
            <span>|</span>
            <span>회원가입</span>
          </SearchDiv>
        </LoginBoxContent>
      </LoginBox>
    </Overlay>
  );
};

export default Login;
