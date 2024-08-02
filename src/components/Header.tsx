import styled from "styled-components";
import { mainColor } from "../color";
import { useNavigate } from "react-router-dom";
import { toggleSignup, toggleLogin } from "../counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import LoginForm from "./Login";
import EnrollForm from "./Signup";
import { isLoggedInVar, logUserOut } from "../useUser";
import { g1 } from "./../color";
import { useState } from "react";

const Container = styled.header`
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
  background-color: white;
  box-shadow: 0px 1px 15px 2px rgba(0, 0, 0, 0.05);
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  @media (max-width: 480px) {
    padding: 0 1rem;
  }
`;

const Logo = styled.h1`
  color: ${mainColor};
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  height: 70px;
  align-content: center;
  @media (max-width: 480px) {
    height: 50px;
    font-size: 1.5rem;
  }
`;

const Gnb = styled.ul<{ $active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  li {
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
  }
  @media (max-width: 960px) {
    display: block;
    position: fixed;
    width: ${(props) => (props.$active ? "15rem" : "0")};
    height: 100%;
    background-color: white;
    transition: 0.3s;
    top: 0;
    right: 0;
    z-index: 99;
    box-shadow: 0px 1px 15px 2px rgba(0, 0, 0, 0.05);
    padding: 6rem 0;
    li {
      margin: 0 1rem;
    }
  }
  @media (max-width: 480px) {
    width: 100%;
    display: ${(props) => (props.$active ? "flex" : "none")};
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
`;

const HamBtn = styled.button<{ $active: boolean }>`
  background-color: transparent;
  border: none;
  font-size: 1.8rem;
  position: relative;
  z-index: 999;
  cursor: pointer;
  display: none;
  width: 2.5rem;
  height: 2.5rem;
  span {
    width: 100%;
    height: ${(props) => (props.$active ? "0px" : "4px")};
    display: block;
    border-radius: 3px;
    background-color: ${g1};
    position: relative;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 4px;
      display: block;
      border-radius: 3px;
      background-color: ${g1};
      top: ${(props) => (props.$active ? "50%" : "-10px")};
      left: ${(props) => (props.$active ? "50%" : "0")};
      transform: ${(props) =>
        props.$active ? "translate(-50%, -50%) rotate(45deg)" : null};
      transition: 0.3s;
    }
    &::after {
      top: ${(props) => (props.$active ? "50%" : "10px")};
      transform: ${(props) =>
        props.$active ? "translate(-50%, -50%) rotate(-45deg)" : null};
    }
  }
  @media (max-width: 960px) {
    display: block;
  }
`;

const Header = () => {
  const [isHamActive, setIsHamActive] = useState(false);
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
        <Logo onClick={() => navigate("/")}>Odiro</Logo>
        <Gnb $active={isHamActive}>
          <li onClick={() => navigate("/")}>홈</li>
          {isLoggedInVar ? (
            <li onClick={onLogoutClicked}>로그아웃</li>
          ) : (
            <>
              <li onClick={onCreateClicked}>회원가입</li>
              <li onClick={onLoginClicked}>로그인</li>
            </>
          )}
        </Gnb>
        <HamBtn
          onClick={() => setIsHamActive((prev) => !prev)}
          $active={isHamActive}
        >
          <span></span>
        </HamBtn>
      </Nav>
      {loginClicked && <LoginForm />}
      {enrollClicked && <EnrollForm />}
    </Container>
  );
};

export default Header;
