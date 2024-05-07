import { useState } from "react";
import { StyledCalendarContainer } from "./styles";
import moment from "moment";
import Calendar from "react-calendar";
import styled from "styled-components";
import { color } from "../color";

const TopLine = styled.div<{ $i: number }>`
  position: absolute;
  height: 8px;
  width: 70px;
  background-color: ${(props) => color[props.$i]};
`;
const BottomLine = styled.div<{ $i: number }>`
  position: absolute;
  margin-top: 8px;
  height: 8px;
  width: 70px;
  background-color: ${(props) => color[props.$i]};
`;

const Trip = [
  ["2024-05-18", "2024-05-23"],
  ["2024-05-23", "2024-05-28"],
  ["2024-06-08", "2024-06-13"],
  ["2024-06-12", "2024-06-18"],
];

const whatLine: number[] = [];
for (var i = 0; i < Trip.length; i++) {
  if (i === 0) {
    whatLine.push(1);
    continue;
  } else if (Trip[i][0] <= Trip[i - 1][1]) {
    if (whatLine[i - 1] === 1) {
      whatLine.push(2);
      continue;
    }
    if (whatLine[i - 1] === 2) {
      whatLine.push(1);
      continue;
    }
  } else {
    whatLine.push(1);
  }
}

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | any;

function HomeCalendar() {
  const [value, setValue] = useState<Value>();

  const onClick = (value: any, event: any) => {
    console.log(value);
  };

  return (
    <StyledCalendarContainer>
      <Calendar
        value={value}
        onClickDay={(value, event) => onClick(value, event)}
        formatDay={(locale, date) => moment(date).format("D")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        showFixedNumberOfWeeks={false}
        tileContent={({ date }) =>
          Trip.map((value, index) => {
            const isTripHit =
              moment(date).format("YYYY-MM-DD") >= value[0] &&
              moment(date).format("YYYY-MM-DD") <= value[1];
            if (!isTripHit) {
              return null;
            }

            if (whatLine[index] === 1) {
              return (
                <TopLine
                  $i={index}
                  key={date.getMilliseconds() + index}
                ></TopLine>
              );
            }
            if (whatLine[index] === 2) {
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
    </StyledCalendarContainer>
  );
}
export default HomeCalendar;
