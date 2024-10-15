import styled from "styled-components";
import { g4, mainColor } from "../utils/color";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { phone } from "../utils/size";

const Container = styled.main`
  width: 450px;
  height: 50vh;
  margin: 10rem auto;
  @media (max-width: ${phone}) {
    width: 90%;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 2.8rem;
  border-radius: 1rem;
  outline: none;
  border: 1px solid ${mainColor};
  padding: 0;
  text-indent: 1rem;
  font-size: 0.9rem;
`;

const UserBoxs = styled.ul`
  margin-top: 2.5rem;
  width: 100%;
  height: 400px;
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
  color: white;
  border: none;
  cursor: pointer;
  width: 80px;
  height: 40px;
  border-radius: 5px;
  font-weight: bold;
  font-size: 0.9rem;
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

  //   const searchUser = async (): Promise<IData[]> => {
  //     //get요청
  //     //username을 파라메타로
  //     //응답은 유저들의 배열
  //     //username이 있다면 한명 or 없음
  //     //username이 없다면 랜덤 여러명
  //   };

  //   const { data, refetch } = useQuery({
  //     queryKey: ["user", username],
  //     queryFn: searchUser,
  //   });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //refetch();
    setUsername("");
  };

  const SendFriendRequest = (id: number) => {
    //get요청
    //id를 파라메타로
    //응답은 성공여부만
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
        {data.map((value, index) => (
          <UserBox key={index}>
            <div>
              <Avatar $url={value.profile_img}></Avatar>
              <span>{value.username}</span>
            </div>
            <Btn onClick={() => SendFriendRequest(value.id)}>친구요청</Btn>
          </UserBox>
        ))}
      </UserBoxs>
    </Container>
  );
};

export default SearchUser;
