import styled from "styled-components";
import Header from "../components/Header";
import { mainColor } from "../color";
import PlanCalendar from "../components/PlanCalendar";
import { useState } from "react";

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TopBox = styled.div`
  width: 90%;
  max-width: 1300px;
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CheckBoxs = styled.div`
  max-width: 450px;
  width: 33%;
  display: flex;
  flex-wrap: wrap;
`;

const CheckBox = styled.div`
  padding: 12px;
  border-radius: 20px;
  margin-right: 3px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 600;
  background-color: ${mainColor};
  color: white;
`;

const Title = styled.div`
  width: 33%;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: ${mainColor};
`;

const AvatarBox = styled.div`
  width: 33%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Avatar = styled.div<{ $avatarurl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${mainColor};
  background-image: url(${({ $avatarurl }) => $avatarurl});
  background-size: cover;
  cursor: pointer;
  &:nth-child(2) {
    margin-left: -25px;
  }
`;

const MiddleBox = styled.div`
  width: 90%;
  max-width: 1300px;
  margin-top: 50px;
  display: flex;
  align-items: center;
`;

const Map = styled.div`
  width: 55%;
  height: 450px;
  background-color: black;
  margin-right: 5%;
`;

const checkBoxList = [
  "혼자만",
  "여럿이서",
  "느긋하게",
  "바쁘게",
  "남자만",
  "여자만",
  "비용절약",
  "플렉스",
  "맛집위주",
  "활동적인",
  "인생샷",
  "힐링여행",
];

const data = {
  title: "여행 타이틀 입니다",
  first_day: "2024-07-08",
  last_day: "2024-07-13",
  checkBoxValue: [
    false,
    false,
    false,
    true,
    false,
    false,
    false,
    false,
    true,
    true,
    true,
    true,
  ],
  member: [
    {
      name: "user1",
      email: "1@1",
      profile_image:
        "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=11288960&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNS8wMi9DTFM2OS9OVVJJXzAwMV8wNDQ2X251cmltZWRpYV8yMDE1MTIwMw==&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006",
    },
    {
      name: "user2",
      email: "2@2",
      profile_image:
        "https://png.pngtree.com/thumb_back/fw800/background/20231219/pngtree-pink-pastel-background-with-pink-aesthetic-sky-image_15522922.png",
    },
  ],
  todo: { memo: "this is memo" },
  comment: {
    content: "this is comment",
  },
};

const Plan = () => {
  const [date, setDate] = useState("");
  const handleDataChange = (value: any) => {
    setDate(value);
    console.log(date);
  };

  return (
    <>
      {data && (
        <>
          <Header />
          <Container>
            <TopBox>
              <CheckBoxs>
                {data.checkBoxValue.map((value: boolean, index: number) => {
                  return value ? (
                    <CheckBox key={index}>{checkBoxList[index]}</CheckBox>
                  ) : null;
                })}
              </CheckBoxs>
              <Title>{data.title}</Title>
              <AvatarBox>
                {data.member.slice(0, 2).map((value, index) => (
                  <Avatar key={index} $avatarurl={value.profile_image}></Avatar>
                ))}
              </AvatarBox>
            </TopBox>
            <MiddleBox>
              <Map></Map>
              <PlanCalendar
                first_day={data.first_day}
                last_day={data.last_day}
                onDataChange={handleDataChange}
              ></PlanCalendar>
            </MiddleBox>
          </Container>
        </>
      )}
    </>
  );
};

export default Plan;
