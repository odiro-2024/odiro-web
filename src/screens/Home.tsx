import styled from "styled-components";
import HomeCalendar from "../components/HomeCalendar";
import Header from "../components/Header";
import { mainColor } from "../color";
import SelectDateForm from "../components/SelectDateForm";
import { useRef, useState } from "react";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const MakePlanDiv = styled.div`
  margin-top: 200px;
  margin-bottom: 20px;
  width: 80%;
  max-width: 700px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
`;

const MakePlanBtn = styled.div`
  background-color: ${mainColor};
  width: 85px;
  height: 40px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: 600;
  cursor: pointer;
  font-size: 15px;
  &:hover {
    scale: 1.08;
  }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
`;

const Home = () => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [modalShow, setModalShow] = useState(false);

  const modalOutSideClick = (e: any) => {
    if (modalRef.current === e.target) {
      setModalShow(false);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <MakePlanDiv>
          <MakePlanBtn onClick={() => setModalShow(true)}>새 여행</MakePlanBtn>
          {modalShow && (
            <>
              <Overlay
                ref={modalRef}
                onClick={(e: any) => modalOutSideClick(e)}
              ></Overlay>
              <SelectDateForm></SelectDateForm>
            </>
          )}
        </MakePlanDiv>
        <HomeCalendar />
      </Container>
    </>
  );
};

export default Home;
