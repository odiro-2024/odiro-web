import styled from "styled-components";
import { g1, mainColor } from "../../utils/color";
import axios from "axios";
import { useEffect, useState } from "react";
import { getAccessToken } from "../../services/useUser";

const Container = styled.section`
  margin-top: 10rem;
`;

const H2 = styled.h2`
  margin-top: 5rem;
  color: ${g1};
  font-size: 1.9rem;
  margin-bottom: 2rem;
  font-weight: bold;
`;

const Ul = styled.ul``;

const Li = styled.li`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
  padding: 0.4rem 0.5rem;
  position: relative;
`;

const Avatar = styled.div<{ $url: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #addd85;
  margin-right: 1rem;
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
  padding: 0.7rem;
  font-size: 1.1rem;
  font-family: "HakgyoansimNadeuri";
  border-radius: 2rem;
  position: absolute;
  right: 1rem;
  cursor: pointer;
  &:hover {
    scale: 1.05;
    transition: 0.3s;
  }
`;

const DeleteBtn = styled(Btn)`
  background-color: #da8c8c;
`;

interface IData {
  id: number;
  username: string;
  profileImg: string;
}

interface IRequestData {
  id: number;
  username: string;
  profileImg: string;
}

const FriendList = () => {
  const [friendList, setFriendList] = useState<IData[]>([]);
  const [friendRequestList, setFriendRequestList] = useState<IRequestData[]>(
    []
  );

  const handleDeleteFriend = (id: number, index: number) => {
    const ACCESS_TOKEN = getAccessToken();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/friend/delete`,
        {
          friendId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const newArray = friendList.filter((_, i) => i !== index);
        setFriendList(newArray);
      })
      .catch((error) => console.log(error));
  };

  const handleRequestOK = (id: number, index: number) => {
    const ACCESS_TOKEN = getAccessToken();
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/friend/accept`,
        {
          sender_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const removedElement = friendRequestList[index];
        const newArray = friendRequestList.filter((_, i) => i !== index);
        setFriendRequestList(newArray);
        setFriendList([
          ...friendList,
          {
            id: removedElement.id,
            username: removedElement.username,
            profileImg: removedElement.profileImg,
          },
        ]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const ACCESS_TOKEN = getAccessToken();
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/friend/list`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => setFriendList(res.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const ACCESS_TOKEN = getAccessToken();
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/friend/wait/list`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setFriendRequestList(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container>
      <H2>친구목록</H2>
      <Ul>
        {friendList?.map((value, index) => (
          <Li key={index}>
            <Avatar $url={value.profileImg} />
            <Username>{value.username}</Username>
            <DeleteBtn onClick={() => handleDeleteFriend(value.id, index)}>
              친구삭제
            </DeleteBtn>
          </Li>
        ))}
      </Ul>
      <H2>친구요청목록</H2>
      <Ul>
        {friendRequestList?.map((value, index) => (
          <Li key={index}>
            <Avatar $url={value.profileImg} />
            <Username>{value.username}</Username>
            <Btn onClick={() => handleRequestOK(value.id, index)}>초대수락</Btn>
          </Li>
        ))}
      </Ul>
    </Container>
  );
};

export default FriendList;
