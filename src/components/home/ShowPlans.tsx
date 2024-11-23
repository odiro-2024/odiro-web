import styled from "styled-components";
import Dropdown from "../shared/Dropdown";
import { useEffect, useRef, useState } from "react";
import PlanItem from "./PlanItem";
import { IData } from "../../pages/Plan";
import axios from "axios";

const Container = styled.section<{ $isAnimation: boolean }>`
  max-width: 1200px;
  margin: auto;
  margin-bottom: 6rem;
  position: relative;
  left: ${(props) => (props.$isAnimation ? "-10rem" : "0")};
  opacity: ${(props) => (props.$isAnimation ? "0" : "1")};
  transition: 1.5s;
  &.frame-in {
    left: 0rem;
    opacity: 1;
  }
  @media (max-width: 700px) {
    margin: 0 2rem;
  }
`;

const H2 = styled.h2`
  margin-bottom: 2rem;
  display: block;
  font-size: 1.8rem;
  font-weight: bold;
`;

const DropdownArea = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 1rem 0;
`;

const PlanArea = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  @media (max-width: 1300px) {
    width: 900px;
  }
  @media (max-width: 1000px) {
    width: 700px;
  }
  @media (max-width: 700px) {
    width: auto;
  }
`;

const GROUP_SIZE = ["전체", "혼자만", "여럿이서"];
const MOOD = ["전체", "느긋하게", "바쁘게"];
const GENDER = ["전체", "남자만", "여자만"];
const BUDGET = ["전체", "비용절약", "플렉스"];
const PREFERENCE = ["전체", "맛집위주", "활동위주"];
const TYPE = ["전체", "인생샷", "힐링여행"];

interface IProps {
  isAnimation: boolean;
  h2: string;
  dropDownExist: boolean;
}

const ShowPlans = ({ isAnimation, h2, dropDownExist }: IProps) => {
  const [data, setData] = useState<IData[]>([]);
  const [groupSize, setGroupSize] = useState("전체"); // 그룹 크기
  const [mood, setMood] = useState("전체"); // 분위기 또는 상태
  const [gender, setGender] = useState("전체"); // 성별
  const [budget, setBudget] = useState("전체"); // 예산
  const [preference, setPreference] = useState("전체"); // 선호도
  const [type, setType] = useState("전체"); // 여행타입
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLSelectElement | null>(null);

  const getFilterNum = () => {
    let str = "";
    if (groupSize === "전체") str += "0";
    if (groupSize === "혼자만") str += "1";
    if (groupSize === "여럿이서") str += "2";

    if (mood === "전체") str += "0";
    if (mood === "느긋하게") str += "1";
    if (mood === "바쁘게") str += "2";

    if (gender === "전체") str += "0";
    if (gender === "남자만") str += "1";
    if (gender === "여자만") str += "2";

    if (budget === "전체") str += "0";
    if (budget === "비용절약") str += "1";
    if (budget === "플렉스") str += "2";

    if (preference === "전체") str += "0";
    if (preference === "맛집위주") str += "1";
    if (preference === "활동위주") str += "2";

    if (type === "전체") str += "0";
    if (type === "인생샷") str += "1";
    if (type === "힐링여행") str += "2";

    return str;
  };

  useEffect(() => {
    const filterNum = getFilterNum();
    axios
      .get("/api/home/plan", {
        params: {
          filterNum,
        },
      })
      .then((res) => setData(res.data))
      .catch((error) => console.log(error));
  }, [groupSize, mood, gender, budget, preference, type]);

  useEffect(() => {
    if (!ref.current) return; // 요소가 아직 준비되지 않은 경우 중단

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && isAnimation) {
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

  return (
    <Container
      $isAnimation={isAnimation}
      className={isInViewport ? "frame-in" : ""}
      ref={ref}
    >
      <H2>{h2}</H2>
      {dropDownExist && (
        <DropdownArea>
          <Dropdown
            category="그룹 크기"
            data={GROUP_SIZE}
            setState={setGroupSize}
          />
          <Dropdown category="분위기" data={MOOD} setState={setMood} />
          <Dropdown category="성별" data={GENDER} setState={setGender} />
          <Dropdown category="예산" data={BUDGET} setState={setBudget} />
          <Dropdown
            category="선호도"
            data={PREFERENCE}
            setState={setPreference}
          />
          <Dropdown category="타입" data={TYPE} setState={setType} />
        </DropdownArea>
      )}
      <PlanArea>
        {data?.map((value, index) => (
          <PlanItem key={index} data={value}></PlanItem>
        ))}
      </PlanArea>
    </Container>
  );
};

export default ShowPlans;
