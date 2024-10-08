import { useState } from "react";
import { StyledCalendarContainer } from "./PlanCalendarStyles";
import { format } from "date-fns";
import Calendar from "react-calendar";
import styled from "styled-components";
import { mainColor } from "../../utils/color";
import { phone, tablet_M } from "../../utils/size";

const Line = styled.div`
  position: absolute;
  bottom: 0;
  height: 8px;
  width: 100%;
  background-color: ${mainColor};
  @media (max-width: ${tablet_M}) {
    bottom: 0px;
  }
  @media (max-width: ${phone}) {
    bottom: 0px;
    height: 6px;
  }
`;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | any;

interface Props {
  first_day: string;
  last_day: string;
  onDataChange: any;
}

function PlanCalendar({ first_day, last_day, onDataChange }: Props) {
  const [value] = useState<Value>(first_day);

  const onClicked = (value: Date) => {
    onDataChange(value);
  };

  const isPlanHit = (date: Date) => {
    return date.toISOString() >= first_day && date.toISOString() <= last_day;
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
