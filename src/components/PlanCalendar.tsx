import { useState } from "react";
import { StyledCalendarContainer } from "./PlanCalendarSyles";
import { format } from "date-fns";
import Calendar from "react-calendar";
import styled from "styled-components";
import { mainColor } from "../color";

const Line = styled.div`
  position: absolute;
  bottom: 8px;
  height: 8px;
  width: 100%;
  background-color: ${mainColor};
`;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | any;

interface Props {
  firstDay: Date;
  lastDay: Date;
  onDataChange: any;
}

function PlanCalendar({ firstDay, lastDay, onDataChange }: Props) {
  const [value] = useState<Value>(firstDay);

  const onClicked = (value: Date) => {
    onDataChange(value);
  };

  const isPlanHit = (date: Date) => {
    return date >= firstDay && date <= lastDay;
  };

  return (
    <StyledCalendarContainer>
      <Calendar
        value={value}
        onClickDay={(value) => onClicked(value)}
        formatDay={(_, date) => format(date, "d")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        showFixedNumberOfWeeks={false}
        tileDisabled={({ date }) => !isPlanHit(date)}
        tileContent={({ date }) => isPlanHit(date) && <Line></Line>}
      />
    </StyledCalendarContainer>
  );
}
export default PlanCalendar;
