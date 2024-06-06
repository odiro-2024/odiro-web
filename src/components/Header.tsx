import styled from "styled-components";
import { mainColor } from "../color";
import { useNavigate } from "react-router-dom";
import { toggleEnroll, toggleLogin } from "../counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import LoginForm from "./LoginForm";
import EnrollForm from "./EnrollForm";

const Container = styled.div`
  height: 80px;
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
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
  cursor: pointer;
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
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginClicked = useSelector(
    (state: RootState) => state.counter.loginClicked
  );
  const enrollClicked = useSelector(
    (state: RootState) => state.counter.enrollClicked
  );

  const onLoginClicked = () => dispatch(toggleLogin());
  const onCreateClicked = () => dispatch(toggleEnroll());

  return (
    <Container>
      <Box>
        <Logo onClick={() => navigate("/")}>ODIRO</Logo>
        <Column>
          <Span onClick={() => navigate("/")}>홈</Span>
          <Span onClick={onCreateClicked}>회원가입</Span>
          <Span onClick={onLoginClicked}>로그인</Span>
        </Column>
      </Box>
      {loginClicked && <LoginForm />}
      {enrollClicked && <EnrollForm />}
    </Container>
  );
};

export default Header;
