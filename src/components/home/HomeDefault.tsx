import styled from "styled-components";
import { mainColor } from "../../utils/color";
import { useEffect, useRef, useState } from "react";
import { toggleLogin } from "../../contexts/counterSlice";
import { useDispatch } from "react-redux";
import { font_cute } from "../../utils/font";

const Container = styled.section`
  margin: 5rem 0;
  width: 80%;
  max-width: 700px;
  padding-top: min(45%, 380px);
  border: 1px solid ${mainColor};
  border-radius: 2rem;
  position: relative;
  opacity: 0;
  transition: 1.2s;
  right: -9rem;
  h2 {
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: ${font_cute};
    color: ${mainColor};
    font-weight: bold;
    font-size: min(3vw, 2.1rem);
  }
  &.frame-in {
    opacity: 1;
    right: 0rem;
  }
`;

const Plus = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(6vw, 4rem);
  height: min(6vw, 4rem);
  border-radius: 50%;
  border: 1px solid ${mainColor};
  cursor: pointer;
  &:hover {
    background-color: ${mainColor};
    color: white;
    span {
      background-color: white;
      &::before {
        background-color: white;
      }
    }
  }
  span {
    width: 70%;
    padding-top: 7%;
    border-radius: 0.5rem;
    background-color: ${mainColor};
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before {
      content: "";
      width: 100%;
      height: 100%;
      border-radius: 0.5rem;
      background-color: ${mainColor};
      display: block;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) rotate(90deg);
    }
  }
`;

const HomePlus = () => {
  const dispatch = useDispatch();
  const [isInViewport, setIsInViewport] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!ref.current) return; // 요소가 아직 준비되지 않은 경우 중단

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 나타났을 경우
          setIsInViewport(true);
        } else {
          // 요소가 뷰포트를 벗어난 경우
          setIsInViewport(false);
        }
      });
    };

    const options = { root: null, rootMargin: "0px", threshold: 0 };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current); // 요소 관찰 시작

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 관찰 중단
    };
  }, []);

  const onLoginClicked = () => dispatch(toggleLogin());

  return (
    <Container className={isInViewport ? "frame-in" : ""} ref={ref}>
      <Plus onClick={onLoginClicked}>
        <span></span>
      </Plus>
      <h2>Make your happy trip!</h2>
    </Container>
  );
};

export default HomePlus;
