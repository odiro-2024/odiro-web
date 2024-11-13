import styled from "styled-components";
import HomeBg from "../components/home/HomeBg";
import { isLoggedInVar } from "../services/useUser";
import Festival from "../components/home/Festival";
import ShowPlans from "../components/home/ShowPlans";

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  overflow: hidden;
`;

const Home = () => {
  return (
    <>
      <Container>
        <HomeBg />
        {isLoggedInVar ? <Festival /> : null}
        <ShowPlans></ShowPlans>
      </Container>
    </>
  );
};

export default Home;
