import styled from "styled-components";
import { g4, mainColor } from "../utils/color";
import { useState } from "react";
import { phone } from "../utils/size";
import axios from "axios";
import { ACCESS_TOKEN } from "../services/useUser";

const Container = styled.main`
  width: 450px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  @media (max-width: ${phone}) {
    width: 90%;
  }
`;

const Input = styled.input`
  width: 450px;
  height: 3.3rem;
  border-radius: 1rem;
  outline: none;
  border: 1px solid ${mainColor};
  padding: 0;
  text-indent: 1rem;
  font-size: 1.1rem;
  font-family: "HakgyoansimNadeuri";
`;

const UserBoxs = styled.ul`
  margin-top: 2rem;
  width: 450px;
  height: 50vh;
  border: 1px solid ${mainColor};
  border-radius: 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
`;

const UserBox = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${g4};
  div {
    display: flex;
    align-items: center;
    span {
      font-size: 1.2rem;
      margin-left: 1rem;
    }
  }
`;

const Avatar = styled.div<{ $url: string }>`
  background: url(${({ $url }) => $url}) no-repeat center;
  background-size: cover;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;

const Btn = styled.button`
  background-color: ${mainColor};
  font-family: "HakgyoansimNadeuri";
  color: white;
  border: none;
  cursor: pointer;
  width: 80px;
  height: 40px;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 1.1rem;
`;

const EmptyText = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
  align-content: center;
  font-size: 1.5rem;
  font-family: "HakgyoansimNadeuri";
  opacity: 0.7;
`;

const data = [
  {
    id: 1,
    username: "진혁",
    profile_img:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
  },
  {
    id: 1,
    username: "진혁",
    profile_img:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
  },
  {
    id: 1,
    username: "진혁",
    profile_img:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
  },
  {
    id: 1,
    username: "진혁",
    profile_img:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
  },
  {
    id: 1,
    username: "진혁",
    profile_img:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
  },
  {
    id: 1,
    username: "진혁",
    profile_img:
      "https://cdn.imweb.me/upload/S202207202685e30f16e24/8b48c67f8cdf6.jpeg",
  },
];

interface IData {
  id: number;
  username: string;
  profile_img: string;
}

const SearchUser = () => {
  const [username, setUsername] = useState("");
  const [data, setData] = useState<IData[]>([]);
  const [sendList, setSendList] = useState<number[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSendList([]);
    axios
      .get(`/api/user/search/${username}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setUsername("");
        setData(res.data);
      })
      .catch((error) => console.log(error));
  };

  const SendFriendRequest = (id: number, index: number) => {
    axios
      .post(
        "/api/friend/request",
        {
          receiver_id: id,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        setSendList((prev) => [...prev, index]);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <form onSubmit={(e) => handleSubmit(e)}>
        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="유저이름을 입력하세요."
        ></Input>
      </form>
      <UserBoxs>
        {data?.length !== 0 ? (
          data?.map((value, index) => (
            <UserBox key={index}>
              <div>
                <Avatar $url={value.profile_img}></Avatar>
                <span>{value.username}</span>
              </div>
              <Btn
                style={{ opacity: sendList.includes(index) ? "0.5" : "1" }}
                onClick={() => SendFriendRequest(value.id, index)}
              >
                {sendList.includes(index) ? "전송완료" : "친구요청"}
              </Btn>
            </UserBox>
          ))
        ) : (
          <EmptyText>친구를 찾아보세요</EmptyText>
        )}
      </UserBoxs>
    </Container>
  );
};

export default SearchUser;
