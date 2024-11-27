import styled from "styled-components";
import Modal from "./Modal";
import { mainColor } from "../../utils/color";
import { useForm } from "react-hook-form";
import { Input } from "../../pages/Login";

const Form = styled.form`
  padding: 2rem 1rem;
  border-radius: 1rem;
  position: relative;
  top: -5rem;
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 1rem;
  position: relative;
`;

const PwInput = styled(Input)`
  border-radius: 1.3rem;
  width: 24rem;
  font-family: "HakgyoansimGeurimilgi";
  font-size: 1rem;
  border: 2px solid
    ${({ $isvalid }) =>
      $isvalid === "true" ? `${mainColor}` : "rgba(209, 64, 64, 0.61)"};
  &:first-child {
    margin-top: 0;
  }
  &:focus {
    border: 3px solid ${mainColor};
  }
`;

const Button = styled.button`
  border: none;
  background-color: ${mainColor};
  color: white;
  width: 3.5rem;
  height: 2.5rem;
  font-weight: bold;
  font-size: 1.1rem;
  border-radius: 0.5rem;
  font-family: "HakgyoansimGeurimilgi";
  cursor: pointer;
`;

const ErrorMsg = styled.p`
  position: absolute;
  color: #df4d4d;
  left: 1.5rem;
  bottom: 3rem;
  font-weight: bold;
`;

interface IProps {
  setModalOpen: any;
  onPwCorrect: any;
}

interface FormData {
  password: string;
}

const PwCheck = ({ setModalOpen, onPwCorrect }: IProps) => {
  const {
    register,
    getValues,
    setValue,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormData>();

  const clear = () => {
    setValue("password", "");
  };

  const modalClose = () => {
    setModalOpen(false);
    clear();
  };

  const onSubmitValid = () => {
    const { password } = getValues();
    //success
    onPwCorrect();
    modalClose();
    //fail
    // setError("password", {
    //   message: "비밀번호가 일치하지 않습니다.",
    // });
  };

  return (
    <Modal isActive={true} modalClose={modalClose}>
      <Form onSubmit={handleSubmit(onSubmitValid)}>
        <PwInput
          {...register("password", {
            required: true,
          })}
          autoComplete="off"
          type="password"
          name="password"
          placeholder="비밀번호를 입력해주세요."
          $isvalid={!errors?.password ? "true" : "false"}
        />
        <Button>확인</Button>
        {errors?.password && <ErrorMsg>{errors.password.message}</ErrorMsg>}
      </Form>
    </Modal>
  );
};

export default PwCheck;
