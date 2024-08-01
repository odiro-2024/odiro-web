import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { mainColor } from "../../color";

export const StyledCalendarContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: flex-end;
  .react-calendar {
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    height: 25rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.1);
    border-radius: 0.5rem;
    line-height: 1.7rem;
    border: none;
    padding: 5px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  //nav
  .react-calendar__navigation button {
    color: ${mainColor};
    height: 40px;
    margin: 5px 0;
    font-size: 1.2rem;
    font-weight: bold;
    border-radius: 0.7rem;
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
    display: block;
    font-size: 14px;
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
`;
