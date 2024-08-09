import styled from "styled-components";
import Header from "../components/header/Header";
import { mainColor } from "../utils/color";
import PlanCalendar from "../components/calendar/PlanCalendar";
import { useEffect, useState } from "react";
import { Imarkers } from "../components/location/SearchLocation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../services/useUser";
import { tablet_M, mw, desktop } from "../utils/size";
import LocationBox from "../components/plan/Location";
import Memo from "../components/plan/Memo";
import Comment from "../components/plan/Comment";
import MapBox from "../components/location/MapBox";
import AvatarBox from "../components/plan/AvatarBox";
import CheckBoxs from "../components/plan/CheckBoxs";
import SearchLocation from "../components/location/SearchLocation";

const Container = styled.main`
  width: 90%;
  max-width: ${mw};
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 3.5rem;
`;

const TopBox = styled.section`
  width: 100%;
  margin-top: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
`;

const EmptyDiv = styled.div`
  @media (max-width: ${tablet_M}) {
    width: calc(100% / 3);
  }
`;

const Title = styled.h2`
  width: calc(100% / 3);
  text-align: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: ${mainColor};
`;

const MiddleBox = styled.section`
  width: 100%;
  display: flex;
  @media (max-width: ${tablet_M}) {
    flex-direction: column;
    align-items: center;
  }
`;

const BottomBox = styled.section`
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  @media (max-width: ${tablet_M}) {
    flex-direction: column;
    align-items: center;
  }
`;

const MemoCommentBox = styled.div`
  width: 22rem;
  height: 25rem;
  margin-left: 2rem;
  position: relative;
  perspective: 1200px;
  @media (max-width: ${desktop}) {
    width: 19rem;
  }
  @media (max-width: ${tablet_M}) {
    max-width: 30rem;
    height: 20rem;
    margin-left: 0rem;
    width: 100%;
  }
`;

const checkBoxValue = [
  false,
  false,
  false,
  true,
  false,
  false,
  false,
  false,
  true,
  true,
  true,
  true,
];

export interface IData {
  id: number;
  title: string;
  first_day: string;
  last_day: string;
  checkBoxValue: boolean[];
  owner: IOwner;
  participant: IOwner[];
  day_plan: IDayPlan[];
}

interface IOwner {
  id: number;
  name: string;
  email: string;
  profile_img: string;
}

interface IDayPlan {
  id: number;
  date: string;
  location: ILocation[];
  memo: IMemo[];
  comment: IComment[];
}

export interface ILocation {
  id: number;
  address_name: string;
  kakao_map_id: string;
  phone: string;
  place_name: string;
  place_url: string;
  lat: number;
  lng: number;
  road_address_name: string;
  category_group_name: string;
  img_url: string;
}

export interface IMemo {
  id: number;
  content: string;
}

export interface IComment {
  id: number;
  member_id: number;
  content: string;
  created_at: string;
}

const Plan = () => {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<Imarkers[]>([]);
  const [location, setLocation] = useState<ILocation[]>([]);
  const [memo, setMemo] = useState<IMemo[]>([]);
  const [comment, setComment] = useState<IComment[]>([]);
  const [data, setData] = useState<IData>();
  const [isMemo, setIsMemo] = useState(true);

  const handleDateChange = (value: Date, propData?: IData) => {
    const scopeData: IData | undefined = data || propData;
    if (!scopeData) return;
    setData({
      id: scopeData.id,
      title: scopeData.title,
      first_day: scopeData.first_day,
      last_day: scopeData.last_day,
      checkBoxValue: scopeData.checkBoxValue,
      owner: scopeData.owner,
      participant: scopeData.participant,
      day_plan: scopeData.day_plan.map((v, i) => {
        if (i !== index) {
          return v;
        } else {
          return {
            id: v.id,
            date: v.date,
            location: propData?.day_plan[i].location || location,
            memo: propData?.day_plan[i].memo || memo,
            comment: propData?.day_plan[i].comment || comment,
          };
        }
      }),
    });

    var newindex = 0;
    scopeData.day_plan.forEach((item: IDayPlan, index: number) => {
      if (value.toISOString().slice(0, 10) === item.date.slice(0, 10)) {
        newindex = index;
      }
    });
    //setDate(value);
    setIndex(newindex);

    setLocation(scopeData.day_plan[newindex].location);
    if (propData) {
      setMemo(scopeData.day_plan[newindex].memo.reverse());
      setComment(scopeData.day_plan[newindex].comment.reverse());
    } else {
      setMemo(scopeData.day_plan[newindex].memo);
      setComment(scopeData.day_plan[newindex].comment);
    }
  };

  const createLocation = (infoBox: Imarkers) => {
    if (!data) return;
    const {
      address_name,
      id: kakao_map_id,
      phone,
      place_name,
      place_url,
      position: { lat, lng },
      road_address_name,
      category_group_name,
      img_url,
    } = infoBox;

    axios
      .post(
        `/api/location/create`,
        {
          day_plan_id: data.day_plan[index].id,
          address_name,
          kakao_map_id,
          phone,
          place_name,
          place_url,
          lat,
          lng,
          road_address_name,
          category_group_name: category_group_name || "미정",
          img_url,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const {
          data: { id },
        } = res;
        setLocation((prev) => [
          ...prev,
          {
            id,
            address_name,
            kakao_map_id,
            phone,
            place_name,
            place_url,
            lat,
            lng,
            road_address_name,
            category_group_name: category_group_name || "미정",
            img_url,
          },
        ]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    axios
      .get(`/api/plan/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        const { data } = res;
        setData(data);
        handleDateChange(new Date(data.first_day), data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (location.length !== 0) {
      const bounds = new kakao.maps.LatLngBounds();
      let markers: Imarkers[] = [];

      for (var i = 0; i < location.length; i++) {
        // @ts-ignore
        markers.push({
          address_name: location[i].address_name,
          id: location[i].kakao_map_id,
          phone: location[i].phone,
          place_name: location[i].place_name,
          place_url: location[i].place_url,
          road_address_name: location[i].road_address_name,
          position: {
            lat: +location[i].lat,
            lng: +location[i].lng,
          },
          img_url: location[i].img_url,
          category_group_name: location[i].category_group_name,
        });
        // @ts-ignore
        bounds.extend(new kakao.maps.LatLng(location[i].lat, location[i].lng));
      }
      setMarkers(markers);
      map?.setBounds(bounds);
    } else {
      const bounds = new kakao.maps.LatLngBounds();
      bounds.extend(new kakao.maps.LatLng(37.566826, 126.9786567));
      map?.setBounds(bounds);
    }
  }, [map, location]);

  useEffect(() => {
    const $boxs = document.querySelector(".boxs");
    const onMouseEnter = () => {
      const child = $boxs?.childNodes as NodeListOf<HTMLElement>;
      child.forEach((v, i) => {
        v.style.transitionDelay = `${0.2 * i}s`;
        v.style.transitionDuration = `0.9s`;
      });
    };
    const onMouseLeave = () => {
      const child = $boxs?.childNodes as NodeListOf<HTMLElement>;
      child.forEach((v, i) => {
        v.style.transitionDelay = `0s`;
        v.style.transitionDuration = "0s";
      });
    };
    $boxs?.addEventListener("mouseenter", onMouseEnter);
    $boxs?.addEventListener("mouseleave", onMouseLeave);

    return () => {
      $boxs?.removeEventListener("mouseenter", onMouseEnter);
      $boxs?.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [data]);

  return (
    <>
      {data && (
        <>
          <Header />
          <Container>
            <TopBox>
              <EmptyDiv />
              <CheckBoxs checkBoxValue={checkBoxValue}></CheckBoxs>
              <Title>{data.title}</Title>
              <AvatarBox data={data}></AvatarBox>
            </TopBox>
            <MiddleBox>
              <MapBox setMap={setMap} markers={markers}></MapBox>
              <PlanCalendar
                first_day={data.first_day}
                last_day={data.last_day}
                onDataChange={handleDateChange}
              ></PlanCalendar>
            </MiddleBox>
            <BottomBox>
              <LocationBox
                index={index}
                location={location}
                setLocation={setLocation}
              ></LocationBox>
              <MemoCommentBox>
                <Memo
                  memo={memo}
                  setMemo={setMemo}
                  isMemo={isMemo}
                  setIsMemo={setIsMemo}
                  day_plan_id={data.day_plan[index].id}
                ></Memo>
                <Comment
                  comment={comment}
                  setComment={setComment}
                  isMemo={isMemo}
                  setIsMemo={setIsMemo}
                  day_plan_id={data.day_plan[index].id}
                ></Comment>
              </MemoCommentBox>
            </BottomBox>
          </Container>
          <SearchLocation onDataChange={createLocation} />
        </>
      )}
    </>
  );
};

export default Plan;
