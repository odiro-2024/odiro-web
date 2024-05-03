import styled from "styled-components";

const Container = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
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
  color: #95d3d9;
  font-size: 30px;
  margin-left: 25px;
`;

const Column = styled.div`
  margin-right: 50px;
`;

const Span = styled.span`
  font-weight: 600;
  margin-left: 50px;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.8);
  cursor: pointer;
  &:hover {
    color: #95d3d9;
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
