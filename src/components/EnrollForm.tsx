import { styled } from "styled-components";
import { motion } from "framer-motion";
import { faComment, faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toggleEnroll } from "../counterSlice";
import { useRef, useState } from "react";
import { mainColor } from "../color";

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

const EnrollBox = styled.div`
  max-width: 500px;
  width: 60%;
  max-height: 680px;
  height: 80%;
  border-radius: 5px;
  background-color: white;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
  }
`;

const EnrollBoxHeader = styled.div`
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
      letter-spacing: 2px;
      font-size: 21px;
    }
    &:last-child {
      cursor: pointer;
      opacity: 0.9;
      font-size: 20px;
    }
  }
`;

const EnrollBoxContent = styled.div`
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
  height: 45px;
  border-radius: 20px;
  border: 1px solid
    ${({ $isvalid }) =>
      $isvalid === "true" ? `${mainColor}` : "rgba(209, 64, 64, 0.61)"};
  outline: none;
  text-indent: 15px;
  font-size: 15px;
  margin-top: 15px;
  &:first-child {
    margin-top: 45px;
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
  margin-top: 40px;
  background-color: ${mainColor};
  color: white;
  &:last-child {
    margin-top: 15px;
    background-color: yellow;
    color: black;
    font-size: 18px;
  }
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
  id: string;
  password: string;
  password2: string;
  name: string;
  email: string;
}

const EnrollForm = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const [errorMsg] = useState("");

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      dispatch(toggleEnroll());
    }
  };

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitValid = () => {
    const { id, password, password2, name, email } = getValues();
    console.log(id, password, password2, name, email);
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
        <EnrollBoxHeader>
          <span>ENROLL</span>
          <span onClick={() => dispatch(toggleEnroll())}>
            <FontAwesomeIcon icon={faX} />
          </span>
        </EnrollBoxHeader>
        <EnrollBoxContent>
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("id", { required: true })}
              type="text"
              name="id"
              placeholder="아이디를 입력해주세요"
              $isvalid={!errors?.id ? "true" : "false"}
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
            <Input
              {...register("password2", {
                required: true,
              })}
              autoComplete="off"
              type="password"
              name="password2"
              placeholder="비밀번호를 다시 입력해주세요"
              $isvalid={!errors?.password2 ? "true" : "false"}
            />{" "}
            <Input
              {...register("name", { required: true })}
              type="text"
              name="name"
              placeholder="이름을 입력해주세요"
              $isvalid={!errors?.name ? "true" : "false"}
            />
            <Input
              {...register("email", { required: true })}
              type="email"
              name="email"
              placeholder="이메일을 입력해주세요"
              $isvalid={!errors?.email ? "true" : "false"}
            />
            <ErrorMsg>{errorMsg}</ErrorMsg>
            <Button>회원가입</Button>
            <Button>
              <FontAwesomeIcon
                icon={faComment}
                style={{ fontSize: "27px", marginRight: "12px" }}
              />
              카카오 로그인
            </Button>
          </Form>
          <SearchDiv>
            <span>아이디 찾기</span>
            <span>|</span>
            <span>비밀번호 찾기</span>
            <span>|</span>
            <span>로그인</span>
          </SearchDiv>
        </EnrollBoxContent>
      </EnrollBox>
    </Overlay>
  );
};

export default EnrollForm;
