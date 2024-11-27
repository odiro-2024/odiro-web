import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { g3 } from "../../utils/color";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Container = styled.section`
  max-width: 1200px;
  width: 90%;
  margin-bottom: 7rem;
  margin-top: 5rem;
  position: relative;
  bottom: -10rem;
  opacity: 0;
  transition: 0.9s;
  @media (max-width: 1300px) {
    max-width: 900px;
  }
  @media (max-width: 1000px) {
    max-width: 600px;
  }
  @media (max-width: 700px) {
    width: 285px;
  }
  &.frame-in {
    opacity: 1;
    bottom: 0rem;
  }
  &::before {
    content: "이번주 추천 페스티벌";
    margin-bottom: 2rem;
    display: block;
    font-size: 1.8rem;
    font-weight: bold;
  }
`;

const Item = styled.div`
  width: 285px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const Img = styled.div<{ $url: string }>`
  width: 100%;
  height: 195px;
  border-radius: 0.5rem;
  background: url(${({ $url }) => $url}) center no-repeat;
  background-size: cover;
`;

const InfoBox = styled.div`
  width: 90%;
  span {
    font-size: 1.1rem;
    margin-top: 1rem;
    display: block;
    &:nth-child(1) {
      font-weight: bold;
    }
    &:nth-child(2) {
      margin-top: 0.8rem;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    &:nth-child(3),
    &:nth-child(4) {
      margin-top: 0.5rem;
      opacity: 0.7;
    }
  }
`;

// 커스텀 네비게이션 버튼 스타일
const CustomNavButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  color: ${g3};
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PrevButton = styled(CustomNavButton)`
  left: -3.5rem; /* Swiper 외부에 위치시키기 위해 왼쪽으로 이동 */
`;

const NextButton = styled(CustomNavButton)`
  right: -3.5rem; /* Swiper 외부에 위치시키기 위해 오른쪽으로 이동 */
`;

interface IFestival {
  addr1: string;
  addr2: string;
  event_end_date: string;
  event_start_date: string;
  first_image: string;
  first_image2: string;
  tel: string;
  title: string;
}

const Festival = () => {
  const ref = useRef<HTMLSelectElement | null>(null);
  const [data, setData] = useState<IFestival[]>([]);
  const [isInViewport, setIsInViewport] = useState(false);

  function formatDateToYYYYMMDD(date: Date) {
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    return `${year}${month}${day}`;
  }

  function formatDateString(yyyymmdd: string): string {
    const yy = yyyymmdd.slice(2, 4);
    const mm = yyyymmdd.slice(4, 6);
    const dd = yyyymmdd.slice(6, 8);

    const year = parseInt(yy, 10) + 2000;
    const month = parseInt(mm, 10) - 1;
    const day = parseInt(dd, 10);

    const date = new Date(year, month, day);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    const dayOfWeek = days[date.getDay()];

    return `${yy}.${mm}.${dd}(${dayOfWeek})`;
  }

  useEffect(() => {
    if (!ref.current) return; // 요소가 아직 준비되지 않은 경우 중단

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // 요소가 뷰포트에 나타났을 경우
          setIsInViewport(true);
        } else {
          // 요소가 뷰포트를 벗어난 경우
          setIsInViewport(false);
        }
      });
    };

    const options = { root: null, rootMargin: "0px", threshold: 0 };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(ref.current); // 요소 관찰 시작

    return () => {
      observer.disconnect(); // 컴포넌트 언마운트 시 관찰 중단
    };
  }, []);

  useEffect(() => {
    const date = new Date();
    const today = formatDateToYYYYMMDD(date);
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}/api/location/festival/research`,
        {
          yyyymmdd: today,
        }
      )
      .then((res) => {
        const {
          data: { items },
        } = res;
        setData(items);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Container className={isInViewport ? "frame-in" : ""} ref={ref}>
      <PrevButton className="custom-prev">
        <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
      </PrevButton>
      <NextButton className="custom-next">
        <FontAwesomeIcon icon={faAngleRight}></FontAwesomeIcon>
      </NextButton>
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        navigation={{
          nextEl: ".custom-next", // 커스텀 네비게이션 버튼과 연결
          prevEl: ".custom-prev",
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        breakpoints={{
          700: {
            slidesPerView: 2,
          },
          1000: {
            slidesPerView: 3,
          },
          1300: {
            slidesPerView: 4,
          },
        }}
      >
        {data.map((value, index) => (
          <SwiperSlide key={index}>
            <Item>
              <Img $url={value.first_image}></Img>
              <InfoBox>
                <span>{value.title}</span>
                <span>{value.addr1}</span>
                <span>
                  {formatDateString(value.event_start_date)} ~{" "}
                  {formatDateString(value.event_end_date)}
                </span>
                <span>tel: {value.tel}</span>
              </InfoBox>
            </Item>
          </SwiperSlide>
        ))}
      </Swiper>
    </Container>
  );
};

export default Festival;
