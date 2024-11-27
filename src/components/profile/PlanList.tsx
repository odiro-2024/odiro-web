import styled from "styled-components";
import ShowPlans from "../home/ShowPlans";
import { g1, mainColor } from "../../utils/color";
import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../../services/useUser";

const Container = styled.div`
  margin-top: 10rem;
  padding-bottom: 3rem;
`;

const H2 = styled.h2`
  margin-top: 5rem;
  color: ${g1};
  font-size: 1.9rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const Ul = styled.ul`
  margin-bottom: 5rem;
`;

const Li = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 0.4rem 1rem;
  position: relative;
  height: 60px;
`;

const Username = styled.span`
  font-size: 1.2rem;
`;

const Btn = styled.button`
  background-color: ${mainColor};
  border: none;
  color: white;
  padding: 0.7rem;
  font-size: 1.1rem;
  font-family: "HakgyoansimNadeuri";
  border-radius: 2rem;
  position: absolute;
  right: 1rem;
  cursor: pointer;
  &:hover {
    scale: 1.05;
    transition: 0.3s;
  }
`;

interface IData {
  plan_id: number;
  plan_title: string;
}

const PlanList = () => {
  const [planRequestList, setPlanRequestList] = useState<IData[]>();

  const handleRequestOK = (id: number, index: number) => {
    const ACCESS_TOKEN = getAccessToken();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/plan/join`,
        {
          id,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        setPlanRequestList((prev) =>
          prev ? prev.filter((_, i) => i !== index) : []
        );
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const ACCESS_TOKEN = getAccessToken();
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/plan/wait/list`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => setPlanRequestList(res.data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <H2>초대받은 여행</H2>
      <Ul>
        {planRequestList?.map((value, index) => (
          <Li key={index}>
            <Username>{value.plan_title}</Username>
            <Btn onClick={() => handleRequestOK(value.plan_id, index)}>
              초대수락
            </Btn>
          </Li>
        ))}
      </Ul>
      <ShowPlans isAnimation={false} dropDownExist={false} h2="나의 여행목록" />
    </Container>
  );
};

export default PlanList;
