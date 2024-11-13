import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { mainColor } from "../../utils/color";
import { phone, tablet_M } from "../../utils/size";

export const StyledCalendarContainer = styled.div`
  width: 20rem;
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
  overflow: hidden;
  .react-calendar {
    border-radius: 0px;
    background-color: yellow;
    width: 100%;
    height: 100%;
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4em;
    padding: 10px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  //nav
  .react-calendar__navigation button {
    color: ${mainColor};
    height: 35px;
    margin: 20px 0;
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
    font-family: "HakgyoansimGeurimilgi", sans-serif;
  }
  //타일 기본 설정
  .react-calendar__tile {
    font-family: "HakgyoansimGeurimilgi", sans-serif;
    border-radius: 50%;
    color: black;
    &:hover {
      background-color: #e6e6e6;
    }
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
  @media (max-width: ${tablet_M}) {
    width: 18rem;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.13);
    .react-calendar {
      line-height: 1.2rem;
    }
  }
  @media (max-width: ${phone}) {
    position: fixed;
    width: 100%;
    height: 100%;
    max-height: none;
    max-width: none;
    z-index: 999;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
    .react-calendar {
      width: 100%;
      height: auto;
      line-height: 10vw;
      box-shadow: none;
    }
  }
`;
