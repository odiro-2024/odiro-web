import { useEffect, useRef, useState } from "react";
import { StyledCalendarContainer } from "./HomeCalendarStyles";
import { format } from "date-fns";
import Calendar from "react-calendar";
import styled from "styled-components";
import { color, mainColor } from "../../color";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectDateForm from "./SelectDate";

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
  span,
  p {
    display: block;
    color: ${mainColor};
    font-size: 19px;
    font-weight: 600;
    margin-top: 25px;
    margin-left: 1rem;
    position: relative;
  }
  span {
    margin-left: 2rem;
    &::before {
      content: "";
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: ${mainColor};
      top: 50%;
      transform: translateY(-50%);
      left: -1rem;
    }
  }
  div {
    font-size: 14.3px;
    background-color: ${mainColor};
    max-width: 120px;
    width: 8rem;
    padding: 0.3rem 0.5rem;
    margin-top: 0.5rem;
    margin-left: 1rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
  }
  @media (max-width: 760px) {
    width: 100%;
    max-width: none;
    min-height: 15rem;
    height: auto;
    margin-top: 1rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    border: 0.5rem;
    border-radius: 0.5rem;
    @media (max-width: 480px) {
      width: 95%;
      margin-top: 1rem;
      box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    }
  }
`;

const MakePlanBtn = styled.div`
  position: absolute;
  top: -3.5rem;
  right: 0;
  background-color: ${mainColor};
  width: 85px;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  align-content: center;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: 15px;
  transition: 0.3s;
  transform-origin: center;
  &:hover {
    scale: 1.08;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | any;

interface Ischedule {
  id: number;
  title: string;
}

interface Iplan {
  id: number;
  title: string;
  first_day: string;
  last_day: string;
}

function HomeCalendar() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalShow, setModalShow] = useState(false);

  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return; // 요소가 아직 준비되지 않은 경우 중단

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 나타났을 경우
          setIsInViewport(true);
        } else {
          // 요소가 뷰포트를 벗어난 경우
          setIsInViewport(false);
        }
      });
    };

    const options = { root: null, rootMargin: "0px", threshold: 0 };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current); // 요소 관찰 시작

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 관찰 중단
    };
  }, []);

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      setModalShow(false);
    }
  };
  const [value, setValue] = useState<Value>(new Date());
  const [schedule, setSchedule] = useState<Ischedule[]>([]);
  const navigate = useNavigate();
  const [plan, setPlan] = useState<Iplan[]>([]);
  const chooseLine: number[] = [];
  for (var i = 0; i < plan.length; i++) {
    if (i === 0) {
      chooseLine.push(1);
      continue;
    } else if (plan[i].first_day <= plan[i - 1].last_day) {
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

  useEffect(() => {
    axios.get("/api/home").then((res) => {
      const { data } = res;
      setPlan(data);
      console.log(data);
    });
  }, []);

  useEffect(() => {
    setSchedule([]);
    for (let i = 0; i < plan.length; i++) {
      const isPlanHit =
        format(value, "yyyy-MM-dd") >= plan[i].first_day &&
        format(value, "yyyy-MM-dd") <= plan[i].last_day;
      if (isPlanHit) {
        setSchedule((prev) => [
          ...prev,
          { id: plan[i].id, title: plan[i].title },
        ]);
      }
    }
  }, [plan, value]);

  const onClicked = (value: any) => {
    setValue(value);
  };

  return (
    <StyledCalendarContainer
      className={isInViewport ? "frame-in" : ""}
      ref={ref}
    >
      <MakePlanBtn onClick={() => setModalShow(true)}>새 여행</MakePlanBtn>
      {modalShow && (
        <>
          <Overlay
            ref={modalRef}
            onClick={(e: any) => modalOutSideClick(e)}
          ></Overlay>
          <SelectDateForm onCloseClicked={setModalShow}></SelectDateForm>
        </>
      )}
      <Calendar
        value={value}
        onClickDay={(value) => onClicked(value)}
        formatDay={(_, date) => format(date, "d")}
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
        showFixedNumberOfWeeks={false}
        tileContent={({ date }) =>
          plan.map((value, index) => {
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
        <p>일정</p>
        <div>{format(value, "yyyy년 MM월 dd일")}</div>
        {schedule.map((value, index) => (
          <span
            key={index}
            style={{ cursor: "pointer" }}
            onClick={() => navigate(`/plan/${value.id}`)}
          >
            {value.title}
          </span>
        ))}
      </ScheduleBox>
    </StyledCalendarContainer>
  );
}
export default HomeCalendar;
