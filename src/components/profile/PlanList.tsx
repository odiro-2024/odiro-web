import styled from "styled-components";
import ShowPlans from "../home/ShowPlans";
import { g1, mainColor } from "../../utils/color";

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

const data = [
  { id: 1, title: "제목1" },
  { id: 2, title: "제목2" },
];

const PlanList = () => {
  return (
    <Container>
      <H2>초대받은 여행</H2>
      <Ul>
        {data?.map((value, index) => (
          <Li key={index}>
            <Username>{value.title}</Username>
            <Btn>초대수락</Btn>
          </Li>
        ))}
      </Ul>
      <ShowPlans isAnimation={false} dropDownExist={false} h2="나의 여행목록" />
    </Container>
  );
};

export default PlanList;
