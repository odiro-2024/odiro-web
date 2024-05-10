import { useState } from "react";
import { StyledCalendarContainer } from "./styles";
import { format } from "date-fns";
import Calendar from "react-calendar";
import styled from "styled-components";
import { color, mainColor } from "../color";

const TopLine = styled.div<{ $i: number }>`
  position: absolute;
  bottom: 8px;
  height: 8px;
  width: 100%;
  background-color: ${(props) => color[props.$i]};
`;
const BottomLine = styled.div<{ $i: number }>`
  position: absolute;
  bottom: 0;
  height: 8px;
  width: 100%;
  background-color: ${(props) => color[props.$i]};
`;

const ScheduleBox = styled.div`
  width: 30%;
  max-width: 210px;
  height: 600px;
  margin-left: 2px;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  span {
    display: block;
    color: ${mainColor};
    font-size: 19px;
    font-weight: 600;
    margin-top: 25px;
    margin-left: 18px;
  }
  div {
    font-size: 14.3px;
    background-color: ${mainColor};
    max-width: 120px;
    width: 60%;
    padding: 5px 7px;
    margin-top: 7px;
    margin-left: 18px;
    border-radius: 8px;
    color: white;
    font-weight: 600;
  }
`;

const Trip = [
  ["2024-05-18", "2024-05-23"],
  ["2024-05-23", "2024-05-28"],
  ["2024-06-08", "2024-06-13"],
  ["2024-06-12", "2024-06-18"],
];

const chooseLine: number[] = [];
for (var i = 0; i < Trip.length; i++) {
  if (i === 0) {
    chooseLine.push(1);
    continue;
  } else if (Trip[i][0] <= Trip[i - 1][1]) {
    if (chooseLine[i - 1] === 1) {
      chooseLine.push(2);
      continue;
    }
    if (chooseLine[i - 1] === 2) {
      chooseLine.push(1);
      continue;
    }
  } else {
    chooseLine.push(1);
  }
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | any;

function HomeCalendar() {
  const [value, setValue] = useState<Value>(new Date());

  const onClick = (value: any, event: any) => {
    setValue(value);
  };

  return (
    <StyledCalendarContainer>
      <Calendar
        value={value}
        onClickDay={(value, event) => onClick(value, event)}
        formatDay={(locale, date) => format(date, "d")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        showFixedNumberOfWeeks={false}
        tileContent={({ date }) =>
          Trip.map((value, index) => {
            const isTripHit =
              format(date, "yyyy-MM-dd") >= value[0] &&
              format(date, "yyyy-MM-dd") <= value[1];
            if (!isTripHit) {
              return null;
            }

            if (chooseLine[index] === 1) {
              return (
                <TopLine
                  $i={index}
                  key={date.getMilliseconds() + index}
                ></TopLine>
              );
            }
            if (chooseLine[index] === 2) {
              return (
                <BottomLine
                  $i={index}
                  key={date.getMilliseconds() + index}
                ></BottomLine>
              );
            }

            return null;
          })
        }
      />
      <ScheduleBox>
        <span>Schedule</span>
        <div>{format(value, "yyyy년 MM월 dd일")}</div>
      </ScheduleBox>
    </StyledCalendarContainer>
  );
}
export default HomeCalendar;
