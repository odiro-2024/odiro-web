import styled from "styled-components";
import HomeCalendar from "../components/HomeCalendar";
import Header from "../components/Header";

const Container = styled.div`
  width: 100%;
  height: 200vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const Home = () => {
  return (
    <Container>
      <Header />
      <HomeCalendar />
    </Container>
  );
};

export default Home;
