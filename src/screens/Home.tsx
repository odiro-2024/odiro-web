import styled from "styled-components";
import HomeCalendar from "../components/calendar/HomeCalendar";
import Header from "../components/Header";
import HomeBg from "../components/HomeBg";
import HomePlus from "../components/HomePlus";
import { isLoggedInVar } from "../useUser";

const Container = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  position: relative;
`;

const Home = () => {
  return (
    <>
      <Header />
      <Container>
        <HomeBg></HomeBg>
        {isLoggedInVar ? <HomeCalendar /> : <HomePlus />}
      </Container>
    </>
  );
};

export default Home;
