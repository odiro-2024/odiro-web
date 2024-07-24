import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { mainColor } from "../../color";

export const StyledCalendarContainer = styled.div`
  width: 60%;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
  position: absolute;
  top: -1rem;
  right: -1rem;
  z-index: 99;
  border-radius: 0.5rem;
  .react-calendar {
    width: 100%;
    height: 100%;
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.7em;
    border: none;
    padding: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  //nav
  .react-calendar__navigation button {
    color: ${mainColor};
    height: 30px;
    margin: 25px 0;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
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
    font-size: 14px;
  }
  //타일 기본 설정
  .react-calendar__tile {
    border-radius: 50%;
    color: black;
  }
  //오늘 타일
  .react-calendar__tile--now {
    background-color: white;
    &:hover {
      background-color: #e6e6e6;
    }
  }
  //선택중인 타일
  .react-calendar__tile--hover {
    background-color: #e6e6e6;
  }
  //선택된 타일
  .react-calendar__tile--range {
    background-color: #e6e6e6;
    &:hover,
    &:focus {
      background-color: ${mainColor};
      color: white;
    }
  }
  //선택된 타일 시작, 끝
  .react-calendar__tile--rangeStart,
  .react-calendar__tile--rangeEnd {
    background-color: ${mainColor};
    color: white;
  }
`;
