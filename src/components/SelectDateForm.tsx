import { styled } from "styled-components";
import { StyledCalendarContainer } from "./SelectDateStyles";
import Calendar from "react-calendar";
import { useState } from "react";
import { format } from "date-fns";
import { mainColor } from "../color";

const Div = styled.div`
  width: 100%;
  height: 75px;
  background-color: white;
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Button = styled.div`
  color: white;
  font-size: 16px;
  width: 55px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 15px 10px;
  border-radius: 10px;
  background-color: ${mainColor};
  cursor: pointer;
  font-weight: 600;
  &:hover {
    scale: 1.05;
  }
`;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | any;

const SelectDateForm = () => {
  const [value, setValue] = useState<Value>();

  const onChange = (value: any, event: any) => {
    setValue(value);
    console.log(value);
  };

  return (
    <StyledCalendarContainer>
      <Calendar
        value={value}
        onChange={(value, event) => onChange(value, event)}
        formatDay={(locale, date) => format(date, "d")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        showFixedNumberOfWeeks={false}
        selectRange={true}
        goToRangeStartOnSelect={false}
        returnValue="range"
      />
      <Div>
        <Button>완료</Button>
      </Div>
    </StyledCalendarContainer>
  );
};

export default SelectDateForm;
