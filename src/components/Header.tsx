import styled from "styled-components";
import { mainColor } from "../color";
import { useNavigate } from "react-router-dom";
import { toggleSignup, toggleLogin } from "../counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import LoginForm from "./Login";
import EnrollForm from "./Signup";
import { isLoggedInVar, logUserOut } from "../useUser";

const Container = styled.div`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: white;
  box-shadow: 0px 1px 15px 2px rgba(0, 0, 0, 0.05);
`;

const Nav = styled.nav`
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

const Logo = styled.h1`
  color: ${mainColor};
  font-size: 30px;
  margin-left: 25px;
  cursor: pointer;
  height: 80px;
  align-content: center;
`;

const Ul = styled.ul`
  margin-right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Li = styled.li`
  font-weight: bold;
  margin-left: 2rem;
  font-size: 1rem;
  padding: 1.2rem 1.5rem;
  border-radius: 2rem;
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
    (state: RootState) => state.counter.signupClicked
  );

  const onLoginClicked = () => dispatch(toggleLogin());
  const onCreateClicked = () => dispatch(toggleSignup());
  const onLogoutClicked = () => {
    logUserOut();
    navigate("/");
    window.location.reload();
  };

  return (
    <Container>
      <Nav>
        <Logo onClick={() => navigate("/")}>ODIRO</Logo>
        <Ul>
          <Li onClick={() => navigate("/")}>홈</Li>
          {isLoggedInVar ? (
            <Li onClick={onLogoutClicked}>로그아웃</Li>
          ) : (
            <>
              <Li onClick={onCreateClicked}>회원가입</Li>
              <Li onClick={onLoginClicked}>로그인</Li>
            </>
          )}
        </Ul>
      </Nav>
      {loginClicked && <LoginForm />}
      {enrollClicked && <EnrollForm />}
    </Container>
  );
};

export default Header;
