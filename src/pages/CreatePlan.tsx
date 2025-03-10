import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { mainColor } from "../utils/color";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { phone } from "../utils/size";
import { getAccessToken } from "../services/useUser";

const Container = styled.main`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CreatePlanBox = styled.section`
  max-width: 410px;
  width: 70%;
  @media (max-width: ${phone}) {
    margin: 8rem 0 2rem 0;
  }
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
  font-family: "HakgyoansimGeurimilgi", sans-serif;
  border: 1px solid
    ${({ $isvalid }) =>
      $isvalid === "true" ? `${mainColor}` : "rgba(209, 64, 64, 0.61)"};
  outline: none;
  text-indent: 1rem;
  font-size: 1.1rem;
  &:focus {
    border-width: 2px;
  }
  @media (max-width: ${phone}) {
    font-size: 3vw;
  }
`;

const CheckBoxs = styled.ul`
  width: 100%;
  margin: 40px 0;
  display: flex;
  flex-wrap: wrap;
`;

const CheckBox = styled.li<{ checked: boolean }>`
  padding: 12px;
  border-radius: 20px;
  margin-right: 3px;
  font-size: 1.1rem;
  margin-bottom: 20px;
  text-align: center;
  font-weight: ${({ checked }) => (checked ? 600 : 500)};
  background-color: ${({ checked }) => (checked ? `${mainColor}` : "white")};
  color: ${({ checked }) => (checked ? "white" : "black")};
  border: ${({ checked }) =>
    checked ? "1px solid white" : "1px solid rgba(0, 0, 0, 0.2)"};
  cursor: pointer;
  @media (max-width: 480px) {
    font-size: 3.5vw;
  }
`;

const Button = styled.h2`
  width: 100%;
  height: 50px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  font-weight: bold;
  cursor: pointer;
  border: none;
  background-color: ${mainColor};
  color: white;
`;

interface FormData {
  title: string;
}

const checkBox = [
  "혼자만",
  "여럿이서",
  "느긋하게",
  "바쁘게",
  "남자만",
  "여자만",
  "비용절약",
  "플렉스",
  "맛집위주",
  "활동위주",
  "인생샷",
  "힐링여행",
];

const CreatePlan = () => {
  const navigate = useNavigate();
  const {
    state: { firstDay, lastDay },
  } = useLocation();
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
  const [isPublic, setIsPublic] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const getFilter = () => {
    const pairMap: { [key: string]: string } = {
      "false,false": "0",
      "true,false": "1",
      "false,true": "2",
    };

    let result = "";
    for (let i = 0; i < checkBoxValue.length; i += 2) {
      const pairKey = `${checkBoxValue[i]},${checkBoxValue[i + 1]}`;
      result += pairMap[pairKey];
    }
    return result;
  };

  const onSubmitValid = () => {
    const { title } = getValues();
    const first_day = firstDay.toISOString();
    const last_day = lastDay.toISOString();
    const plan_filter = getFilter();

    const ACCESS_TOKEN = getAccessToken();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/plan/create`,
        {
          title,
          first_day,
          last_day,
          is_public: isPublic,
          plan_filter,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const { id } = res.data;
        navigate(`/plan/${id}`);
      })
      .catch((error) => console.log(error));
  };

  const handleCheckboxClicked = (index: number) => {
    // 체크 on / off
    if (checkBoxValue[index] === true) {
      setCheckBoxValue([
        ...checkBoxValue.slice(0, index),
        false,
        ...checkBoxValue.slice(index + 1),
      ]);
    } else {
      if (index % 2 === 0) {
        setCheckBoxValue([
          ...checkBoxValue.slice(0, index),
          true,
          false,
          ...checkBoxValue.slice(index + 2),
        ]);
      } else {
        setCheckBoxValue([
          ...checkBoxValue.slice(0, index - 1),
          false,
          true,
          ...checkBoxValue.slice(index + 1),
        ]);
      }
    }
  };

  return (
    <>
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
              <CheckBox
                checked={isPublic}
                onClick={() => setIsPublic((prev) => !prev)}
              >
                여행 공개
              </CheckBox>
              {checkBox.map((value, index) => (
                <CheckBox
                  key={index}
                  checked={checkBoxValue[index]}
                  onClick={() => handleCheckboxClicked(index)}
                >
                  {value}
                </CheckBox>
              ))}
            </CheckBoxs>
            <Button onClick={onSubmitValid}>여행 만들기</Button>
          </Form>
        </CreatePlanBox>
      </Container>
    </>
  );
};

export default CreatePlan;
