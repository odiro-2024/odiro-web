import styled from "styled-components";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { mainColor } from "./../color";
import { useLocation, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  min-height: 550px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CreatePlanBox = styled.div`
  max-width: 410px;
  width: 70%;
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
  align-items: flex-start;
`;

const Input = styled.input<{ $isvalid: string }>`
  width: 100%;
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
    margin-top: 90px;
  }
  &:focus {
    border-width: 2px;
  }
`;

const CheckBoxs = styled.div`
  width: 100%;
  margin: 50px 0;
  display: flex;
  flex-wrap: wrap;
`;

const CheckBox = styled.div<{ checked: boolean }>`
  padding: 12px;
  border-radius: 20px;
  margin-right: 3px;
  margin-bottom: 20px;
  text-align: center;
  font-weight: ${({ checked }) => (checked ? 600 : 500)};
  background-color: ${({ checked }) => (checked ? `${mainColor}` : "white")};
  color: ${({ checked }) => (checked ? "white" : "black")};
  border: ${({ checked }) =>
    checked ? "1px solid white" : "1px solid rgba(0, 0, 0, 0.2)"};
  cursor: pointer;
`;

const Button = styled.button`
  width: 100%;
  height: 50px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 19px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  background-color: ${mainColor};
  color: white;
`;

interface FormData {
  title: string;
}

const checkBoxList = [
  "혼자만",
  "여럿이서",
  "느긋하게",
  "바쁘게",
  "남자만",
  "여자만",
  "비용절약",
  "플렉스",
  "맛집위주",
  "활동적인",
  "인생샷",
  "힐링여행",
];

const CreatePlan = () => {
  const location = useLocation();
  const first_day = location.state.first_day;
  const last_day = location.state.last_day;
  const [checkBoxValue, setCheckBoxValue] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const navigate = useNavigate();

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitValid = () => {
    const { title } = getValues();
    const id = 1;
    navigate(`/plan/${id}`, {
      state: { first_day, last_day, title, checkBoxValue },
    });
  };

  const onClicked = (index: number) => {
    if (checkBoxValue[index] === false) {
      setCheckBoxValue([
        ...checkBoxValue.slice(0, index),
        true,
        ...checkBoxValue.slice(index + 1),
      ]);
    } else {
      setCheckBoxValue([
        ...checkBoxValue.slice(0, index),
        false,
        ...checkBoxValue.slice(index + 1),
      ]);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <CreatePlanBox>
          <Form onSubmit={handleSubmit(onSubmitValid)}>
            <Input
              {...register("title", { required: true })}
              type="text"
              name="title"
              placeholder="여행 제목을 입력해주세요"
              $isvalid={!errors?.title ? "true" : "false"}
            />
            <CheckBoxs>
              {checkBoxList.map((value, index) => (
                <CheckBox
                  key={index}
                  checked={checkBoxValue[index]}
                  onClick={() => onClicked(index)}
                >
                  {value}
                </CheckBox>
              ))}
            </CheckBoxs>
            <Button>여행 만들기</Button>
          </Form>
        </CreatePlanBox>
      </Container>
    </>
  );
};

export default CreatePlan;
