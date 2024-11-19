import styled from "styled-components";
import { mainColor } from "../../utils/color";
import { phone, tablet_M } from "../../utils/size";
import { useEffect, useState } from "react";

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
  checkBoxValue: string;
}

const CheckBoxs = ({ checkBoxValue }: IProps) => {
  const [selectedList, setSelectedList] = useState<string[]>([]);

  useEffect(() => {
    const selectedList = [];
    for (let i = 0; i < checkBoxValue.length; i++) {
      const char = checkBoxValue[i]; // 현재 글자
      const index = parseInt(char, 10); // 글자를 숫자로 변환

      // 현재 글자의 자리수에 해당하는 인덱스 계산
      const firstIndex = i * 2; // 자리수 * 2
      const secondIndex = i * 2 + 1; // 자리수 * 2 + 1

      if (index === 0) {
        // 아무것도 선택되지 않음
        continue;
      } else if (index === 1) {
        // 첫 번째 항목 선택
        selectedList.push(checkBoxList[firstIndex]);
      } else if (index === 2) {
        // 두 번째 항목 선택
        selectedList.push(checkBoxList[secondIndex]);
      }
    }
    setSelectedList(selectedList);
  }, [checkBoxValue]);

  return (
    <Container className="boxs">
      {selectedList.map((value: string, index: number) => (
        <CheckBox key={index}>{value}</CheckBox>
      ))}
    </Container>
  );
};

export default CheckBoxs;
