import "react-calendar/dist/Calendar.css";
import styled from "styled-components";
import { mainColor } from "./../color";

export const StyledCalendarContainer = styled.div`
  width: 1100px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 200px;
  .react-calendar {
    width: 500px;
    height: 600px;
    background-color: #fff;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 3em;
    border-radius: 0.5rem;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.13);
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
    height: 50px;
    margin: 25px 0;
    font-size: 20px;
    font-weight: bold;
    border-radius: 10px;
    position: relative;
  }
  //nav바 포커스
  .react-calendar__navigation button:enabled:focus {
    background-color: white;
    color: ${mainColor};
  }
  //nav바 커서 올렸을 때
  .react-calendar__navigation button:enabled:hover {
    background-color: ${mainColor};
    color: white;
  }
  .react-calendar__navigation button[disabled] {
    background-color: white;
    color: white;
  }
  //월화수목금토일 부분
  abbr[title] {
    text-decoration: none;
    color: ${mainColor};
    margin-top: 55px;
    display: block;
    font-size: 14px;
  }
  //타일 기본 설정
  .react-calendar__tile--now {
    background-color: white;
  }
  .react-calendar__tile {
    //display: flex;
    //flex-direction: column;
    //justify-content: center;
    //align-items: center;
  }
  .react-calendar__month-view__days__day--weekend {
    color: black;
  }
  //날짜에 커서 올렸을 떄
  .react-calendar__tile:enabled:hover {
    background-color: white;
    color: black;
    border-radius: 6px;
  }
  .react-calendar__tile:enabled:focus {
    background-color: white;
    color: black;
    border-radius: 6px;
  }
  //선택중인 타일 사이
  .react-calendar--selectRange .react-calendar__tile--hover {
    background-color: #f8f8fa;
    color: ${mainColor};
  }
  //선택된 타일들 사이
  .react-calendar__tile--range {
    background: #f8f8fa;
    color: ${mainColor};
  }
  //선택된 타일 시작
  .react-calendar__tile--rangeStart {
    border-radius: 6px;
    background-color: ${mainColor};
    color: white;
  }
  //선택된 타일 끝 ///////////////
  .react-calendar__tile--rangeEnd {
    border-radius: 6px;
    background-color: white;
    color: black;
  }
  .react-calendar__tile {
    padding: 10px 0;
  }
  .react-calendar__navigation button {
    &:nth-child(2) {
      pointer-events: none;
    }
  }
`;

//export const StyledCalendar = styled(Calendar)``;
