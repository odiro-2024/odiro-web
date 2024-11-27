import { useEffect, useRef, useState } from "react";
import { StyledCalendarContainer } from "./HomeCalendarStyles";
import { format } from "date-fns";
import Calendar from "react-calendar";
import styled from "styled-components";
import { color, mainColor } from "../../utils/color";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SelectDateForm from "./SelectDate";
import { getAccessToken } from "../../services/useUser";
import { phone, tablet_M } from "../../utils/size";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
`;

const TopLine = styled.div<{ $i: number }>`
  position: absolute;
  bottom: 8px;
  height: 8px;
  width: 100%;
  background-color: ${(props) => color[props.$i]};
`;

const BottomLine = styled(TopLine)`
  bottom: 0;
`;

const ScheduleBox = styled.div`
  width: 30%;
  max-width: 210px;
  height: 520px;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  border-radius: 0 0.5rem 0.5rem 0;
  span,
  h2 {
    display: block;
    color: ${mainColor};
    font-size: 1.5rem;
    font-weight: 600;
    margin-top: 25px;
    margin-left: 1rem;
    position: relative;
    text-align: start;
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
  span {
    margin-left: 2rem;
    &::before {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${mainColor};
      top: 50%;
      transform: translateY(-50%);
      left: -1rem;
    }
  }
  @media (max-width: ${tablet_M}) {
    width: 100%;
    max-width: none;
    min-height: 15rem;
    height: auto;
    margin-top: 1rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    border: 0.5rem;
    border-radius: 0.5rem;
    @media (max-width: ${phone}) {
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
  font-size: 1.1rem;
  transition: 0.3s;
  transform-origin: center;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
  &:hover {
    scale: 1.08;
  }
`;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece] | any;

interface Ischedule {
  id: number;
  title: string;
}

interface ILocation {
  lat: number;
  lng: number;
  imgUrl: string;
  plans: any;
}

interface Iplan {
  id: number;
  title: string;
  firstDay: string;
  lastDay: string;
  locationList: ILocation[];
}

function HomeCalendar() {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalShow, setModalShow] = useState(false);
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState<Value>(new Date());
  const [schedule, setSchedule] = useState<Ischedule[]>([]);
  const [plan, setPlan] = useState<Iplan[]>([]);
  const chooseLine: number[] = [];
  const navigate = useNavigate();

  //같은날 여행이 2개 이상일때
  //라인을 위로 or 아래로 그릴지 설정하는 코드
  for (var i = 0; i < plan.length; i++) {
    if (i === 0) {
      chooseLine.push(1);
      continue;
    } else if (plan[i].firstDay <= plan[i - 1].lastDay) {
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
    const ACCESS_TOKEN = getAccessToken();
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/plan/myplan`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setPlan(data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    //일정 박스 설정 코드
    setSchedule([]);
    for (let i = 0; i < plan.length; i++) {
      const isPlanHit =
        value.toISOString() >= plan[i].firstDay &&
        value.toISOString() <= plan[i].lastDay;
      if (isPlanHit) {
        setSchedule((prev) => [
          ...prev,
          { id: plan[i].id, title: plan[i].title },
        ]);
      }
    }
  }, [plan, value]);

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

  const onClicked = (value: any) => {
    setValue(value);
  };

  return (
    <StyledCalendarContainer
      className={isInViewport ? "frame-in" : ""}
      ref={ref}
    >
      <MakePlanBtn onClick={() => setModalShow(true)}>새 여행</MakePlanBtn>
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
              date.toISOString() >= value.firstDay &&
              date.toISOString() <= value.lastDay;
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
        <h2>일정</h2>
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
      {modalShow && (
        <>
          <Overlay
            ref={modalRef}
            onClick={(e: any) => modalOutSideClick(e)}
          ></Overlay>
          <SelectDateForm onCloseClicked={setModalShow}></SelectDateForm>
        </>
      )}
    </StyledCalendarContainer>
  );
}
export default HomeCalendar;
