import styled from "styled-components";
import HomeCalendar from "../components/calendar/HomeCalendar";
import Header from "../components/header/Header";
import HomeBg from "../components/home/HomeBg";
import HomePlus from "../components/home/HomeDefault";
import { isLoggedInVar } from "../services/useUser";
import Festival from "../components/home/Festival";

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
      <Header />
      <Container>
        <HomeBg />
        {isLoggedInVar ? <HomeCalendar /> : <HomePlus />}
        <Festival></Festival>
      </Container>
    </>
  );
};

export default Home;
