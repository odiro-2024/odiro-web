import styled from "styled-components";
import { mainColor } from "../../utils/color";
import { IData } from "../../pages/Plan";

const Container = styled.div`
  width: calc(100% / 3);
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const Avatar = styled.div<{ $avatarurl: string }>`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${mainColor};
  background-image: url(${({ $avatarurl }) => $avatarurl});
  background-size: cover;
  cursor: pointer;
  &:nth-child(2) {
    margin-left: -25px;
  }
`;

interface IProps {
  data: IData;
}

const AvatarBox = ({ data }: IProps) => {
  return (
    <Container>
      {data.participant.slice(0, 2).map((value, index) => (
        <Avatar key={index} $avatarurl={value.profile_img}></Avatar>
      ))}
    </Container>
  );
};

export default AvatarBox;
