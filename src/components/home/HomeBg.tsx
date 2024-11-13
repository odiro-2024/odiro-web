import styled from "styled-components";
import { tablet_M } from "../../utils/size";
import HomeCalendar from "../calendar/HomeCalendar";
import HomePlus from "./HomeDefault";
import { isLoggedInVar } from "../../services/useUser";

const Section = styled.section`
  height: 60rem;
  width: 100%;
  background: url("/images/bg.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  position: relative;
  h2 {
    font-size: 2em;
    line-height: 1.2;
    font-weight: bold;
    text-align: center;
  }
  > span {
    font-size: 1.714em;
    line-height: 1.2;
    margin: 1rem 0;
  }
  @media (max-width: ${tablet_M}) {
    h2 {
      font-size: 4.2vw;
    }
    > span {
      font-size: 3.6vw;
    }
  }
`;

const Gradient = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 10rem;
  background: linear-gradient(rgba(0, 0, 0, 0), rgb(255, 255, 255));
`;

const HomeBg = () => {
  return (
    <Section>
      {isLoggedInVar ? <HomeCalendar /> : <HomePlus />}
      <Gradient></Gradient>
    </Section>
  );
};

export default HomeBg;
