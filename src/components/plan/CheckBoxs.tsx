import styled from "styled-components";
import { mainColor } from "../../utils/color";
import { phone, tablet_M } from "../../utils/size";

const Container = styled.ul`
  width: calc(100% / 3);
  display: flex;
  flex-wrap: wrap;
  @media (max-width: ${tablet_M}) {
    position: absolute;
    z-index: 9;
    height: 3rem;
    &:hover {
      li {
        opacity: 1;
        visibility: visible;
        &:first-child::before {
          display: none;
        }
      }
    }
  }
  @media (max-width: ${phone}) {
    width: 50%;
  }
`;

const CheckBox = styled.li`
  padding: 12px;
  border-radius: 20px;
  margin: 0 3px 10px 0;
  text-align: center;
  font-weight: bold;
  background-color: ${mainColor};
  color: white;
  @media (max-width: ${tablet_M}) {
    &:not(:first-child) {
      opacity: 0;
      visibility: hidden;
    }
    &:nth-child(1) {
      position: relative;
      &::before {
        content: ". . .";
        position: absolute;
        padding: 12px;
        border-radius: 20px;
        top: 0;
        right: -3.5rem;
        text-align: center;
        font-weight: bold;
        background-color: ${mainColor};
        color: white;
      }
    }
  }
`;

const checkBoxList = [
  "혼자만",
  "여럿이서",
  "느긋하게",
  "바쁘게",
  "남자만",
  "여자만",
  "비용절약",
  "플렉스",
  "맛집위주",
  "활동적인",
  "인생샷",
  "힐링여행",
];

interface IProps {
  checkBoxValue: boolean[];
}

const CheckBoxs = ({ checkBoxValue }: IProps) => {
  return (
    <Container className="boxs">
      {checkBoxValue.map((value: boolean, index: number) => {
        return value ? (
          <CheckBox key={index}>{checkBoxList[index]}</CheckBox>
        ) : null;
      })}
    </Container>
  );
};

export default CheckBoxs;
