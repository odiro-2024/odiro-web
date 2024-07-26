import styled from "styled-components";

const Section = styled.section`
  height: 100vh;
  width: 100%;
  background: url("/images/bg.jpg") no-repeat center;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "Quicksand";
  color: white;
  h2 {
    font-size: 2em;
    line-height: 1.2;
    font-weight: 700;
    font-style: normal;
    text-align: center;
  }
  > span {
    font-size: 1.714em;
    line-height: 1.2;
    margin: 1rem 0;
  }
  @media (max-width: 760px) {
    h2 {
      font-size: 4.2vw;
    }
    > span {
      font-size: 3.6vw;
    }
  }
`;

const HomeBg = () => {
  return (
    <Section>
      <h2>
        <span>We strive to greet</span>
        <br></br>
        <span>a better future.</span>
      </h2>
      <span>CLick here to add your own text and edit me.</span>
    </Section>
  );
};

export default HomeBg;
