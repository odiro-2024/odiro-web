import styled from "styled-components";
import { g2, mainColor } from "../../utils/color";
import { IData } from "../../pages/Plan";
import { useEffect, useState } from "react";
import Modal from "../shared/Modal";
import axios from "axios";
import { getAccessToken } from "../../services/useUser";

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

const InviteBox = styled.div`
  width: 300px;
  height: 450px;
  background-color: white;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
  padding: 2rem 1rem;
  position: relative;
  > span {
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
`;

const Ul = styled.ul`
  width: 100%;
`;

const Li = styled.li`
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0.4rem 0.5rem;
  position: relative;
`;

const FriendAvatar = styled.div<{ $url: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #addd85;
  margin-right: 0.5rem;
  background: url(${({ $url }) => $url}) no-repeat center;
  background-size: cover;
`;

const Username = styled.span`
  font-size: 1.2rem;
`;

const Btn = styled.button`
  background-color: ${mainColor};
  border: none;
  color: white;
  padding: 0.7rem 1rem;
  font-size: 1.1rem;
  font-family: "HakgyoansimNadeuri";
  border-radius: 2rem;
  position: absolute;
  right: 0.5rem;
  cursor: pointer;
  &:hover {
    scale: 1.05;
    transition: 0.3s;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 1rem;
  background-color: transparent;
  border: none;
  font-size: 1.5rem;
  color: ${g2};
  cursor: pointer;
`;

interface IFriend {
  id: number;
  username: string;
  profileImg: string;
}

interface IProps {
  data: IData;
}

const AvatarBox = ({ data }: IProps) => {
  const [openInviteBox, setOpenInviteBox] = useState(false);
  const [friendList, setFriendList] = useState<IFriend[]>();
  const [sendList, setSendList] = useState<number[]>([]);
  const ACCESS_TOKEN = getAccessToken();

  const handleInvite = (id: number, index: number) => {
    axios
      .post(
        "/api/plan/invite",
        {
          plan_id: data.id,
          receiver_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => setSendList((prev) => [...prev, index]))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    axios
      .get("/api/friend/list", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => setFriendList(res.data))
      .catch((error) => console.log(error));
  }, [ACCESS_TOKEN]);

  return (
    <Container>
      {data.participant.slice(0, 2).map((value, index) => (
        <Avatar
          onClick={() => setOpenInviteBox(true)}
          key={index}
          $avatarurl={value.profile_img}
        ></Avatar>
      ))}
      {openInviteBox && (
        <Modal
          isActive={openInviteBox}
          modalClose={() => setOpenInviteBox(false)}
        >
          <InviteBox>
            <span>친구목록</span>
            <CloseBtn onClick={() => setOpenInviteBox(false)}>x</CloseBtn>
            <Ul>
              {friendList?.map((value, index) => (
                <Li key={index}>
                  <FriendAvatar $url={value.profileImg} />
                  <Username>{value.username}</Username>
                  <Btn
                    style={{ opacity: sendList.includes(index) ? "0.5" : "1" }}
                    onClick={() => handleInvite(value.id, index)}
                  >
                    {sendList.includes(index) ? "완료" : "초대"}
                  </Btn>
                </Li>
              ))}
            </Ul>
          </InviteBox>
        </Modal>
      )}
    </Container>
  );
};

export default AvatarBox;
