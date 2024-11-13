import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { mainColor } from "../../utils/color";
import { tablet_M } from "../../utils/size";

export const StyledCalendarContainer = styled.section`
  max-width: 38rem;
  width: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
  margin-bottom: 100px;
  margin-top: 12rem;
  position: relative;
  opacity: 0;
  transition: 0.9s;
  position: relative;
  right: -7rem;
  .react-calendar {
    font-family: "HakgyoansimGeurimilgi", sans-serif;
    width: 70%;
    height: 520px;
    background-color: #fff;
    line-height: 2.5rem;
    border-radius: 0.5rem 0 0 0.5rem;
    border: none;
    padding: 5px;
    user-select: none;
  }
  //nav
  .react-calendar__navigation button {
    color: ${mainColor};
    height: 2rem;
    margin: 25px 0;
    font-family: "HakgyoansimGeurimilgi", sans-serif;
    font-size: 20px;
    font-weight: bold;
    border-radius: 0.5rem;
    position: relative;
    &:nth-child(2) {
      pointer-events: none;
    }
    &:focus {
      background-color: white;
      color: ${mainColor};
    }
    &:hover {
      background-color: ${mainColor};
      color: white;
    }
  }
  //월화수목금토일 부분
  abbr[title] {
    text-decoration: none;
    color: ${mainColor};
    margin-top: 20px;
    display: block;
    font-size: 1rem;
  }
  //타일 기본 설정
  .react-calendar__tile {
    background-color: white;
    color: black;
    position: relative;
    padding: 10px 0;
    &:hover,
    &:focus {
      background-color: white;
      color: black;
    }
  }
  @media (max-width: ${tablet_M}) {
    max-width: 450px;
    flex-direction: column;
    box-shadow: none;
    margin-top: 20rem;
    .react-calendar {
      width: 100%;
      line-height: 2rem;
      height: 30rem;
      border-radius: 0.5rem;
      box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
    }
    .react-calendar__navigation button {
      margin: 10px 0;
    }
    abbr[title] {
      margin-top: 2rem;
    }
  }
  &.frame-in {
    opacity: 1;
    right: 0rem;
  }
`;
