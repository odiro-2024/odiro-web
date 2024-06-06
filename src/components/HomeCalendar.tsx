import { useEffect, useState } from "react";
import { StyledCalendarContainer } from "./HomeCalendarStyles";
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

const Plan = [
  { id: 1, title: "Plan1", first_day: "2024-05-18", last_day: "2024-05-23" },
  { id: 2, title: "Plan2", first_day: "2024-05-23", last_day: "2024-05-28" },
  { id: 3, title: "Plan3", first_day: "2024-06-08", last_day: "2024-06-13" },
  { id: 4, title: "Plan4", first_day: "2024-06-12", last_day: "2024-06-18" },
];

const chooseLine: number[] = [];
for (var i = 0; i < Plan.length; i++) {
  if (i === 0) {
    chooseLine.push(1);
    continue;
  } else if (Plan[i].first_day <= Plan[i - 1].last_day) {
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

interface schedule {
  id: number;
  title: string;
}

function HomeCalendar() {
  const [value, setValue] = useState<Value>(new Date());
  const [schedule, setSchedule] = useState<schedule[]>([]);

  useEffect(() => {
    setSchedule([]);
    for (let i = 0; i < Plan.length; i++) {
      const isPlanHit =
        format(value, "yyyy-MM-dd") >= Plan[i].first_day &&
        format(value, "yyyy-MM-dd") <= Plan[i].last_day;
      if (isPlanHit) {
        setSchedule((prev) => [
          ...prev,
          { id: Plan[i].id, title: Plan[i].title },
        ]);
      }
    }
  }, [value]);

  const onClicked = (value: any) => {
    setValue(value);
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
        tileContent={({ date }) =>
          Plan.map((value, index) => {
            const isPlanHit =
              format(date, "yyyy-MM-dd") >= value.first_day &&
              format(date, "yyyy-MM-dd") <= value.last_day;
            if (!isPlanHit) {
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
        {schedule.map((value, index) => (
          <span key={index} style={{ cursor: "pointer" }}>
            {value.title}
          </span>
        ))}
      </ScheduleBox>
    </StyledCalendarContainer>
  );
}
export default HomeCalendar;
