import styled from "styled-components";
import Dropdown from "../shared/Dropdown";
import { useState } from "react";
import PlanItem from "./PlanItem";

const Container = styled.section`
  width: 90%;
  margin: auto;
  margin-bottom: 6rem;
`;

const DropdownArea = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin: 3rem 0;
`;

const PlanArea = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GROUP_SIZE = ["전체", "혼자만", "여럿이서"];
const MOOD = ["전체", "느긋하게", "바쁘게"];
const GENDER = ["전체", "남자만", "여자만"];
const BUDGET = ["전체", "비용절약", "플렉스"];
const PREFERENCE = ["전체", "맛집위주", "활동위주"];

const data = [
  {
    id: 1,
    title: "재밌는플랜001",
    first_day: "2024-04-06T00:00:00",
    last_day: "2024-05-16T00:00:00",
    owner: {
      id: 1,
      name: "kang",
      email: "xxx@naver.com",
      profile_img: "urlurl",
    },
    participant: [
      {
        id: 1,
        name: "kang",
        email: "xxx@naver.com",
        profile_img: "urlurl",
      },
    ],
    day_plan: [
      {
        id: 1,
        date: "2024-04-06T00:00:00",
        location: [
          {
            id: 1,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.566826,
            lng: 126.9786567,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
          {
            id: 2,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.4668,
            lng: 126.97865,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
        ],
        memo: [],
        comment: [],
      },
    ],
    checkBoxValue: [],
    wish_location: [],
  },
  {
    id: 1,
    title: "재밌는플랜001",
    first_day: "2024-04-06T00:00:00",
    last_day: "2024-05-16T00:00:00",
    owner: {
      id: 1,
      name: "kang",
      email: "xxx@naver.com",
      profile_img: "urlurl",
    },
    participant: [
      {
        id: 1,
        name: "kang",
        email: "xxx@naver.com",
        profile_img: "urlurl",
      },
    ],
    day_plan: [
      {
        id: 1,
        date: "2024-04-06T00:00:00",
        location: [
          {
            id: 1,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.566826,
            lng: 126.9786567,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
          {
            id: 2,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.4668,
            lng: 126.97865,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
        ],
        memo: [],
        comment: [],
      },
    ],
    checkBoxValue: [],
    wish_location: [],
  },
  {
    id: 1,
    title: "재밌는플랜001",
    first_day: "2024-04-06T00:00:00",
    last_day: "2024-05-16T00:00:00",
    owner: {
      id: 1,
      name: "kang",
      email: "xxx@naver.com",
      profile_img: "urlurl",
    },
    participant: [
      {
        id: 1,
        name: "kang",
        email: "xxx@naver.com",
        profile_img: "urlurl",
      },
    ],
    day_plan: [
      {
        id: 1,
        date: "2024-04-06T00:00:00",
        location: [
          {
            id: 1,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.566826,
            lng: 126.9786567,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
          {
            id: 2,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.4668,
            lng: 126.97865,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
        ],
        memo: [],
        comment: [],
      },
    ],
    checkBoxValue: [],
    wish_location: [],
  },
  {
    id: 1,
    title: "재밌는플랜001",
    first_day: "2024-04-06T00:00:00",
    last_day: "2024-05-16T00:00:00",
    owner: {
      id: 1,
      name: "kang",
      email: "xxx@naver.com",
      profile_img: "urlurl",
    },
    participant: [
      {
        id: 1,
        name: "kang",
        email: "xxx@naver.com",
        profile_img: "urlurl",
      },
    ],
    day_plan: [
      {
        id: 1,
        date: "2024-04-06T00:00:00",
        location: [
          {
            id: 1,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.566826,
            lng: 126.9786567,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
          {
            id: 2,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.4668,
            lng: 126.97865,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
        ],
        memo: [],
        comment: [],
      },
    ],
    checkBoxValue: [],
    wish_location: [],
  },
  {
    id: 1,
    title: "재밌는플랜001",
    first_day: "2024-04-06T00:00:00",
    last_day: "2024-05-16T00:00:00",
    owner: {
      id: 1,
      name: "kang",
      email: "xxx@naver.com",
      profile_img: "urlurl",
    },
    participant: [
      {
        id: 1,
        name: "kang",
        email: "xxx@naver.com",
        profile_img: "urlurl",
      },
    ],
    day_plan: [
      {
        id: 1,
        date: "2024-04-06T00:00:00",
        location: [
          {
            id: 1,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.566826,
            lng: 126.9786567,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
          {
            id: 2,
            address_name: "동호로",
            kakao_map_id: "123456789",
            phone: "010-5050-6060",
            place_name: "독서카페",
            place_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            lat: 37.4668,
            lng: 126.97865,
            road_address_name: "강남구 청담동",
            img_url:
              "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
            category_group_name: "식당",
          },
        ],
        memo: [],
        comment: [],
      },
    ],
    checkBoxValue: [],
    wish_location: [],
  },
];

const ShowPlans = () => {
  const [groupSize, setGroupSize] = useState("전체"); // 그룹 크기
  const [mood, setMood] = useState("전체"); // 분위기 또는 상태
  const [gender, setGender] = useState("전체"); // 성별
  const [budget, setBudget] = useState("전체"); // 예산
  const [preference, setPreference] = useState("전체"); // 선호도

  return (
    <Container>
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
      </DropdownArea>
      <PlanArea>
        {data.map((value, index) => (
          <PlanItem key={index} data={value}></PlanItem>
        ))}
      </PlanArea>
    </Container>
  );
};

export default ShowPlans;
