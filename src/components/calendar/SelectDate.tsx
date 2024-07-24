import { styled } from "styled-components";
import { StyledCalendarContainer } from "./SelectDateStyles";
import Calendar from "react-calendar";
import { useState } from "react";
import { format } from "date-fns";
import { mainColor } from "../../color";
import { useNavigate } from "react-router-dom";

const Div = styled.div`
  width: 100%;
  height: 75px;
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
  align-items: center;
  margin: 15px 10px;
  border-radius: 10px;
  background-color: ${mainColor};
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  &:hover {
    scale: 1.05;
  }
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

type ValuePiece = Date | null;

type Value = [ValuePiece, ValuePiece];

const SelectDateForm = () => {
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
      <Div>
        <Button disabled={disabled} onClick={onClicked}>
          완료
        </Button>
      </Div>
    </StyledCalendarContainer>
  );
};

export default SelectDateForm;
