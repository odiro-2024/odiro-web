import { styled } from "styled-components";
import { StyledCalendarContainer } from "./SelectDateStyles";
import Calendar from "react-calendar";
import { useState } from "react";
import { format } from "date-fns";
import { g1, mainColor } from "../../utils/color";
import { useNavigate } from "react-router-dom";
import { phone } from "../../utils/size";

const FooterDiv = styled.div`
  width: 100%;
  height: 70px;
  background-color: white;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.button`
  color: white;
  font-size: 1rem;
  width: 55px;
  height: 40px;
  text-align: center;
  align-content: center;
  margin: 15px 10px;
  border-radius: 10px;
  background-color: ${mainColor};
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  font-family: "HakgyoansimGeurimilgi", sans-serif;
  &:hover {
    scale: 1.05;
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const Close = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  z-index: 999;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  top: 1.5rem;
  right: 1.5rem;
  @media (max-width: ${phone}) {
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      display: block;
      border-radius: 3px;
      background-color: ${g1};
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(45deg);
    }
    &::after {
      top: 50%;
      transform: translate(-50%, -50%) rotate(-45deg);
    }
  }
`;

type ValuePiece = Date | null;

type Value = [ValuePiece, ValuePiece];

const SelectDateForm = ({ onCloseClicked }: any) => {
  const [value, setValue] = useState<Value>();
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  const onChange = (value: any) => {
    setValue(value);
    setDisabled(false);
  };

  const onClicked = () => {
    if (value) {
      navigate("/create", {
        state: {
          firstDay: value[0],
          lastDay: value[1],
        },
      });
    }
  };

  return (
    <StyledCalendarContainer>
      <Calendar
        value={value}
        onChange={(value) => onChange(value)}
        formatDay={(_, date) => format(date, "d")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        showFixedNumberOfWeeks={false}
        selectRange={true}
        goToRangeStartOnSelect={false}
        returnValue="range"
      />
      <FooterDiv>
        <Button disabled={disabled} onClick={onClicked}>
          완료
        </Button>
      </FooterDiv>
      <Close onClick={() => onCloseClicked(false)} />
    </StyledCalendarContainer>
  );
};

export default SelectDateForm;
