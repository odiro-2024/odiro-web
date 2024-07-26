import styled from "styled-components";
import HomeCalendar from "../components/calendar/HomeCalendar";
import Header from "../components/Header";
import HomeBg from "../components/HomeBg";

const Container = styled.div`
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
        <HomeCalendar />
      </Container>
    </>
  );
};

export default Home;
