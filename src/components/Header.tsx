import styled from "styled-components";
import { mainColor } from "../color";

const Container = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2;
  background-color: white;
  box-shadow: 0px 1px 15px 2px rgba(0, 0, 0, 0.05);
`;

const Box = styled.div`
  @media (min-width: 750px) {
    width: 750px;
  }
  @media (min-width: 1050px) {
    width: 1050px;
  }
  @media (min-width: 1300px) {
    width: 1300px;
  }
  @media (min-width: 1500px) {
    width: 1500px;
  }
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  color: ${mainColor};
  font-size: 30px;
  margin-left: 25px;
`;

const Column = styled.div`
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Span = styled.div`
  font-weight: 600;
  margin-left: 30px;
  font-size: 15px;
  padding: 20px 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 26px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  &:hover {
    background-color: ${mainColor};
    color: white;
  }
`;

const Header = () => {
  return (
    <Container>
      <Box>
        <Logo>ODIRO</Logo>
        <Column>
          <Span>홈</Span>
          <Span>회원가입</Span>
          <Span>로그인</Span>
        </Column>
      </Box>
    </Container>
  );
};

export default Header;
