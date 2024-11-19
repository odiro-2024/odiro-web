import styled from "styled-components";
import { mainColor } from "../utils/color";
import MyInfo from "../components/profile/MyInfo";
import { useState } from "react";
import FriendList from "./../components/profile/FriendList";
import PlanList from "../components/profile/PlanList";

const Container = styled.main`
  width: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  overflow-x: hidden;
`;

const SideNavBar = styled.div`
  height: calc(100vh - 80px);
  position: fixed;
  width: 210px;
  margin-top: 80px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
`;

const Li = styled.div`
  width: 100%;
  height: 80px;
  text-align: center;
  align-content: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: bold;
  background-color: white;
  &:hover {
    background-color: ${mainColor};
    color: white;
    border-bottom: 1px solid ${mainColor};
  }
`;

const Content = styled.div`
  height: 100vh;
  flex-grow: 1;
  padding: 0 2rem;
  margin-left: 210px;
`;

const EditProfile = () => {
  const [page, setPage] = useState("내정보");

  return (
    <>
      <Container>
        <SideNavBar>
          <Li onClick={() => setPage("내정보")}>내정보</Li>
          <Li onClick={() => setPage("친구목록")}>친구목록</Li>
          <Li onClick={() => setPage("여행목록")}>여행목록</Li>
        </SideNavBar>
        <Content>
          {page === "내정보" && <MyInfo />}
          {page === "친구목록" && <FriendList />}
          {page === "여행목록" && <PlanList />}
        </Content>
      </Container>
    </>
  );
};

export default EditProfile;
