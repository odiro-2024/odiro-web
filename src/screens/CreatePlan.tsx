import styled from "styled-components";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { mainColor } from "./../color";

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

const CreatePlan = () => {
  //const location = useLocation();
  //const first_day = location.state.first_day;
  //const last_day = location.state.last_day;
  const [solo, setSolo] = useState(false);
  const [multi, setMulti] = useState(false);
  const [slow, setSlow] = useState(false);
  const [fast, setFast] = useState(false);
  const [onlyMan, setOnlyMan] = useState(false);
  const [onlyWoman, setOnlyWoman] = useState(false);
  const [saving, setSaving] = useState(false);
  const [flex, setFlex] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  const [active, setActive] = useState(false);
  const [photo, setPhoto] = useState(false);
  const [healing, setHealing] = useState(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmitValid = () => {
    const { title } = getValues();
    console.log(title);
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
              <CheckBox checked={solo} onClick={() => setSolo((prev) => !prev)}>
                혼자만
              </CheckBox>
              <CheckBox
                checked={multi}
                onClick={() => setMulti((prev) => !prev)}
              >
                여럿이서
              </CheckBox>
              <CheckBox checked={slow} onClick={() => setSlow((prev) => !prev)}>
                느긋하게
              </CheckBox>
              <CheckBox checked={fast} onClick={() => setFast((prev) => !prev)}>
                바쁘게
              </CheckBox>
              <CheckBox
                checked={onlyMan}
                onClick={() => setOnlyMan((prev) => !prev)}
              >
                남자만
              </CheckBox>
              <CheckBox
                checked={onlyWoman}
                onClick={() => setOnlyWoman((prev) => !prev)}
              >
                여자만
              </CheckBox>
              <CheckBox
                checked={saving}
                onClick={() => setSaving((prev) => !prev)}
              >
                비용절약
              </CheckBox>
              <CheckBox checked={flex} onClick={() => setFlex((prev) => !prev)}>
                플렉스
              </CheckBox>
              <CheckBox
                checked={restaurant}
                onClick={() => setRestaurant((prev) => !prev)}
              >
                맛집위주
              </CheckBox>
              <CheckBox
                checked={active}
                onClick={() => setActive((prev) => !prev)}
              >
                활동적인
              </CheckBox>
              <CheckBox
                checked={photo}
                onClick={() => setPhoto((prev) => !prev)}
              >
                인생샷
              </CheckBox>
              <CheckBox
                checked={healing}
                onClick={() => setHealing((prev) => !prev)}
              >
                힐링여행
              </CheckBox>
            </CheckBoxs>
            <Button>여행 만들기</Button>
          </Form>
        </CreatePlanBox>
      </Container>
    </>
  );
};

export default CreatePlan;
