import styled from "styled-components";
import Header from "../components/Header";
import { mainColor } from "../color";
import PlanCalendar from "../components/calendar/PlanCalendar";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import Location, { Imarkers } from "../components/Location";
import {
  faPlus,
  faToggleOff,
  faToggleOn,
  faX,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleLocation } from "../counterSlice";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import DraggableLocation from "../components/DraggableLocation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ACCESS_TOKEN } from "../useUser";

const Container = styled.div`
  width: 90%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  margin: auto;
  gap: 3.5rem;
`;

const TopBox = styled.div`
  width: 100%;
  margin-top: 7rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  @media (max-width: 860px) {
  }
`;

const EmptyDiv = styled.div`
  @media (max-width: 860px) {
    width: calc(100% / 3);
  }
`;

const CheckBoxs = styled.div`
  width: calc(100% / 3);
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 860px) {
    position: absolute;
    z-index: 9;

    &:hover {
      div {
        opacity: 1;
        visibility: visible;
        &:first-child::before {
          display: none;
        }
      }
    }
  }
  @media (max-width: 480px) {
    width: 50%;
  }
`;

const CheckBox = styled.div<{ $index: number }>`
  padding: 12px;
  border-radius: 20px;
  margin-right: 3px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: bold;
  background-color: ${mainColor};
  color: white;
  @media (max-width: 860px) {
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

const Title = styled.div`
  width: calc(100% / 3);
  text-align: center;
  font-size: 1.5rem;
  font-weight: 600;
  color: ${mainColor};
`;

const AvatarBox = styled.div`
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

const MiddleBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 750px) {
    flex-direction: column;
    align-items: center;
  }
`;

const MapBox = styled.div`
  flex-grow: 1;
  height: 25rem;
  position: relative;
  @media (max-width: 1024px) {
    height: 24rem;
  }
  @media (max-width: 860px) {
    height: 19rem;
  }
  @media (max-width: 750px) {
    width: 80%;
    height: 19rem;
    order: 1;
  }
  @media (max-width: 480px) {
    order: 1;
    width: 100%;
    height: 17rem;
  }
`;

const PlacePhoto = styled.div<{ $url: string }>`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: black;
  margin-right: 50%;
  background-image: url("//t1.kakaocdn.net/thumb/T800x0.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2Fsearchregister_1590713355");
  background-size: cover;
  @media (max-width: 860px) {
    width: 4rem;
    height: 4rem;
  }
  @media (max-width: 480px) {
    width: 3rem;
    height: 3rem;
  }
`;

const BottomBox = styled.div`
  width: 100%;
  margin-bottom: 100px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1024px) {
  }
  @media (max-width: 860px) {
    flex-direction: column;
    align-items: center;
  }
  @media (max-width: 480px) {
  }
`;

const LocationBox = styled.div`
  flex-grow: 1;
  border-radius: 1rem;
  border: 1px solid ${mainColor};
  > div {
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        margin: 1.3rem;
        display: block;
        font-size: 25px;
        font-weight: 600;
        color: #252525;
      }
      div {
        margin: 1.3rem;
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 50%;
        text-align: center;
        align-content: center;
        font-size: 1.6rem;
        background-color: ${mainColor};
        color: white;
        cursor: pointer;
      }
    }
  }
  @media (max-width: 1024px) {
  }
  @media (max-width: 860px) {
    min-height: 15rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    max-width: 30rem;
    width: 100%;
  }
  @media (max-width: 480px) {
  }
`;

const MemoCommentBox = styled.div`
  width: 22rem;
  margin-left: 2rem;
  height: 25rem;
  position: relative;
  perspective: 1200px;
  @media (max-width: 1024px) {
    width: 19rem;
  }
  @media (max-width: 860px) {
    max-width: 30rem;
    height: 20rem;
    margin-left: 0rem;
    width: 100%;
  }
  @media (max-width: 480px) {
  }
`;

const MemoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0.7rem 0.5rem 0.7rem;
  span {
    font-family: "Quicksand";
    color: #252525;
    font-size: 1.2rem;
    font-weight: 600;
    display: block;
  }
  div {
    color: ${mainColor};
    cursor: pointer;
    font-size: 2rem;
  }
`;

const MemoBox = styled.div<{ $active: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${mainColor};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  perspective: 900px;
  transition: 0.9s;
  backface-visibility: hidden;
  transform: ${({ $active }) =>
    $active ? "rotateY(0deg)" : " rotateY(180deg)"};
  > div:first-child {
    height: calc(100% - 7rem);
  }
`;

const MemoListBox = styled.div`
  max-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  &::-webkit-scrollbar {
    width: 0px;
  }
  padding-bottom: 1rem;
`;

const MemoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.1rem;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  word-break: break-all;
  span {
    width: calc(100% - 2rem);
    font-size: 1rem;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${mainColor};
      top: 50%;
      transform: translateY(-50%);
      left: -1rem;
    }
  }
  div {
    background-color: #e67878;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    color: white;
    text-align: center;
    align-content: center;
    cursor: pointer;
    opacity: 0;
  }
  &:hover,
  &:active {
    border-radius: 15px;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.1);
    > div {
      &:nth-child(2) {
        transition-duration: 0.9s;
        opacity: 1;
      }
    }
  }
`;

const Form = styled.form`
  margin: 0.5rem 0 0.6rem 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  padding-top: 0.5rem;
  background-color: white;
  button {
    border: none;
    position: absolute;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    display: block;
    background-color: ${mainColor};
    color: white;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;

const Input = styled.input`
  width: calc(100% - 3.2rem);
  height: 1.8rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  text-indent: 10px;
`;

const CommentBox = styled.div<{ $active: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${mainColor};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  perspective: 900px;
  transition: 0.9s;
  backface-visibility: hidden;
  transform: ${({ $active }) =>
    $active ? "rotateY(0deg)" : " rotateY(-180deg)"};
  > div:first-child {
    height: calc(100% - 7rem);
  }
`;

const CommentList = styled.div`
  margin: 0.5rem 0.6rem;
  display: flex;
  word-break: break-all;
  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background-image: url("https://newsimg-hams.hankookilbo.com/2022/11/14/b62ae00e-5a61-46bf-b721-16ebc34873d2.jpg");
    background-size: cover;
    background-color: black;
    margin-right: 0.7rem;
  }
  .content {
    width: calc(100% - 4rem);
    div:first-child {
      line-height: 1.1rem;
      h3 {
        display: inline;
        margin-right: 0.4rem;
        font-size: 0.9rem;
        font-weight: bold;
        color: #353434;
      }
      p {
        display: inline;
        font-size: 15px;
      }
    }
    div:last-child {
      display: flex;
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color: gray;
      span {
        margin-right: 0.7rem;
      }
      button {
        all: unset;
        cursor: pointer;
        font-weight: bold;
        font-size: 12px;
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

const dataEx = {
  id: 1,
  title: "여행 타이틀 입니다",
  first_day: "2024-07-01T15:00:00",
  last_day: "2024-07-01T15:00:00",
  checkBoxValue: [
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
  ],
  owner: {
    id: 1,
    name: "name1",
    email: "1@1",
    profile_img: "@",
  },
  participant: [
    {
      id: 2,
      name: "name1",
      email: "1@1",
      profile_img:
        "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=11288960&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNS8wMi9DTFM2OS9OVVJJXzAwMV8wNDQ2X251cmltZWRpYV8yMDE1MTIwMw==&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006",
    },
    {
      id: 2,
      name: "name2",
      email: "2@2",
      profile_img:
        "https://png.pngtree.com/thumb_back/fw800/background/20231219/pngtree-pink-pastel-background-with-pink-aesthetic-sky-image_15522922.png",
    },
  ],
  day_plan: [
    {
      id: 1,
      date: "2024-07-01T15:00:00",
      location: [
        {
          id: 1,
          address_name: "서울 중구 명동2가 25-36",
          kakao_map_id: "10332413",
          phone: "02-776-5348",
          place_name: "명동교자 본점",
          place_url: "http://place.map.kakao.com/10332413",
          lat: 37.56255453417897,
          lng: 126.98561429978552,
          road_address_name: "서울 중구 명동10길 29",
          category_group_name: "음식점",
          img_url:
            "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FF3BDF45B8EC247F896E4FB7B7C2B5121",
        },
        {
          id: 2,
          address_name: "서울 중구 신당동 370-69",
          kakao_map_id: "1065693087",
          phone: "0507-1307-8750",
          place_name: "금돼지식당",
          place_url: "http://place.map.kakao.com/1065693087",
          lat: 37.55705875134064,
          lng: 127.01167974212188,
          road_address_name: "서울 중구 다산로 149",
          category_group_name: "음식점",
          img_url:
            "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F200912A4F807401FB463DA75478F7E65",
        },
        {
          id: 3,
          address_name: "서울 용산구 한강로1가 251-1",
          kakao_map_id: "220597413",
          phone: "02-794-8592",
          place_name: "몽탄",
          place_url: "http://place.map.kakao.com/220597413",
          lat: 37.53599611679934,
          lng: 126.97224578759753,
          road_address_name: "서울 용산구 백범로99길 50",
          category_group_name: "음식점",
          img_url:
            "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E",
        },
      ],
      memo: [
        {
          id: 1,
          content: "신분증 챙기기",
        },
        {
          id: 2,
          content: "겉옷 챙기기",
        },
        {
          id: 3,
          content: "memo3",
        },
      ],
      comment: [
        {
          id: 1,
          member_id: 2,
          content: "comment 1",
          created_at: "2024-07-01T15:00:00",
        },
        {
          id: 2,
          member_id: 2,
          content: "comment 2",
          created_at: "2024-07-01T15:00:00",
        },
        {
          id: 3,
          member_id: 1,
          content: "comment 3 comment3comment3comment3",
          created_at: "2024-07-01T15:00:00",
        },
      ],
    },
    {
      id: 2,
      date: "2024-07-01T15:00:00",
      location: [
        {
          id: 2,
          address_name: "서울 중구 신당동 370-69",
          kakao_map_id: "1065693087",
          phone: "0507-1307-8750",
          place_name: "금돼지식당",
          place_url: "http://place.map.kakao.com/1065693087",
          lat: 37.55705875134064,
          lng: 127.01167974212188,
          road_address_name: "서울 중구 다산로 149",
          category_group_name: "음식점",
          img_url:
            "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F200912A4F807401FB463DA75478F7E65",
        },
      ],
      memo: [
        {
          id: 4,
          content: "memo4",
        },
        {
          id: 5,
          content: "memo5",
        },
        {
          id: 6,
          content: "memo6",
        },
      ],
      comment: [
        {
          id: 4,
          member_id: 1,
          content: "comment4",
          created_at: "2024-07-01T15:00:00",
        },
      ],
    },
    {
      id: 3,
      date: "2024-07-01T15:00:00",
      location: [
        {
          id: 3,
          address_name: "서울 용산구 한강로1가 251-1",
          kakao_map_id: "220597413",
          phone: "02-794-8592",
          place_name: "몽탄",
          place_url: "http://place.map.kakao.com/220597413",
          lat: 37.53599611679934,
          lng: 126.97224578759753,
          road_address_name: "서울 용산구 백범로99길 50",
          category_group_name: "음식점",
          img_url:
            "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E",
        },
      ],
      memo: [
        {
          id: 7,
          content: "memo7",
        },
        {
          id: 8,
          content: "memo8",
        },
        {
          id: 9,
          content: "memo9",
        },
      ],
      comment: [
        {
          id: 7,
          member_id: 1,
          content: "comment7",
          created_at: "2024-07-01T15:00:00",
        },
        {
          id: 8,
          member_id: 1,
          content: "comment8",
          created_at: "2024-07-01T15:00:00",
        },
        {
          id: 9,
          member_id: 1,
          content: "comment9",
          created_at: "2024-07-01T15:00:00",
        },
      ],
    },
    {
      id: 4,
      date: "2024-07-01T15:00:00",
      location: [],
      memo: [],
      comment: [],
    },
  ],
};

interface IData {
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

interface ILocation {
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

interface IMemo {
  id: number;
  content: string;
}

interface IComment {
  id: number;
  member_id: number;
  content: string;
  created_at: string;
}

interface FormData {
  memo: string;
  comment: string;
}

const Plan = () => {
  let { id } = useParams();
  const [date, setDate] = useState<Date>();
  const [index, setIndex] = useState(0);
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<Imarkers[]>([]);
  const [location, setLocation] = useState<ILocation[]>([]);
  const [memo, setMemo] = useState<IMemo[]>([]);
  const [comment, setComment] = useState<IComment[]>([]);
  const [data, setData] = useState<IData>();
  //var data = dataEx;
  const [isMemo, setIsMemo] = useState(true);

  const dispatch = useDispatch();
  const onLocationClicked = () => dispatch(toggleLocation());
  const locationClicked = useSelector(
    (state: RootState) => state.counter.locationClicked
  );

  const { register, getValues, handleSubmit, setValue } = useForm<FormData>();

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
    setDate(value);
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

  const handleLocationChange = (infoBox: Imarkers) => {
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
      });
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
      });
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

  const locationDeleteClicked = (index: number, id: number) => {
    axios
      .delete(`/api/location/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        const { data, status } = res;
        console.log(data, status);
        setLocation((prev) => [
          ...prev.slice(0, index),
          ...prev.slice(index + 1),
        ]);
      });
  };

  const memoDeleteClicked = (index: number, id: number) => {
    axios
      .delete(`/api/memo/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        const { status } = res;
        if (status === 204) {
          setMemo((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ]);
        }
      });
  };

  const onMemoSubmit = () => {
    if (!data) return;
    const { memo } = getValues();
    if (!memo) return;
    axios
      .post(
        "/api/memo/create",
        {
          day_plan_id: data.day_plan[index].id,
          content: memo,
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
        setMemo((prev) => [{ id, content: memo }, ...prev]);
        setValue("memo", "");
      });
  };

  const onCommentSubmit = () => {
    const { comment } = getValues();
    if (!data || !comment) return;

    axios
      .post(
        "/api/comment/create",
        {
          day_plan_id: data.day_plan[index].id,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
        // {
        //   headers: {
        //     Authorization: `Bear ${accessToken}`,
        //     refresh: `${refreshToken}`,
        //   },
        // }
      )
      .then((res) => {
        const {
          data: { write_time, comment_id },
        } = res;
        setComment((prev) => [
          {
            id: comment_id,
            content: comment,
            member_id: 1,
            created_at: write_time,
          },
          ...prev,
        ]);
        setValue("comment", "");
      });
  };

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    setLocation((prev) => {
      const copy = [...prev];
      const aa = copy.splice(source.index, 1);
      copy.splice(destination?.index, 0, aa[0]);
      return copy;
    });
  };

  const formatDate = (created_at: string) => {
    const milliSecDiff = Date.now() - new Date(created_at).getTime();
    const minDiff = milliSecDiff / (1000 * 60);
    const hourDiff = minDiff / 60;
    const dayDiff = hourDiff / 24;
    if (dayDiff > 1) return dayDiff.toFixed(0) + "일 전";
    if (hourDiff > 1) return hourDiff.toFixed(0) + "시간 전";
    return minDiff.toFixed(0) + "분 전";
  };

  const $boxs = document.querySelector(".boxs");
  $boxs?.addEventListener("mouseenter", (e) => {
    const child = $boxs.childNodes as NodeListOf<HTMLElement>;
    child.forEach((v, i) => {
      v.style.transitionDelay = `${0.2 * i}s`;
      v.style.transitionDuration = `0.9s`;
    });
  });
  $boxs?.addEventListener("mouseleave", () => {
    const child = $boxs.childNodes as NodeListOf<HTMLElement>;
    child.forEach((v, i) => {
      v.style.transitionDelay = `0s`;
      v.style.transitionDuration = "0s";
    });
  });

  return (
    <>
      {data && (
        <>
          <Header />
          <Container>
            <TopBox>
              <EmptyDiv />
              <CheckBoxs className="boxs">
                {dataEx.checkBoxValue
                  .filter((v) => v)
                  .map((value: boolean, index: number) => {
                    return value ? (
                      <CheckBox $index={index} key={index}>
                        {checkBoxList[index]}
                      </CheckBox>
                    ) : null;
                  })}
              </CheckBoxs>
              <Title>{data.title}</Title>
              <AvatarBox>
                {data.participant.slice(0, 2).map((value, index) => (
                  <Avatar key={index} $avatarurl={value.profile_img}></Avatar>
                ))}
              </AvatarBox>
            </TopBox>
            <MiddleBox>
              <MapBox>
                <Map
                  center={{
                    lat: 37.566826,
                    lng: 126.9786567,
                  }}
                  style={{
                    // position: "absolute",
                    // top: "0",
                    // left: "0",
                    width: "100%",
                    height: "100%",
                    //paddingTop: "60%",
                    borderRadius: "15px",
                  }}
                  level={2}
                  onCreate={setMap}
                >
                  {markers.map((marker, index) => (
                    <CustomOverlayMap
                      key={index}
                      position={marker.position}
                      xAnchor={0.4}
                      yAnchor={1.2}
                    >
                      <PlacePhoto $url={marker.img_url}></PlacePhoto>
                    </CustomOverlayMap>
                  ))}
                </Map>
              </MapBox>
              <PlanCalendar
                first_day={data.first_day}
                last_day={data.last_day}
                onDataChange={handleDateChange}
              ></PlanCalendar>
            </MiddleBox>
            <BottomBox>
              <LocationBox>
                <div>
                  <span>Day {index + 1}</span>
                  <div onClick={onLocationClicked}>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="index">
                    {(magic) => (
                      <div ref={magic.innerRef} {...magic.droppableProps}>
                        {location.map((value, index) => (
                          <DraggableLocation
                            key={index}
                            location={value}
                            index={index}
                            onDeleteClick={locationDeleteClicked}
                          />
                        ))}
                        {magic.placeholder}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
              </LocationBox>
              <MemoCommentBox>
                <MemoBox $active={isMemo}>
                  <div>
                    <MemoHeader>
                      <span>Memo</span>
                      <div onClick={() => setIsMemo((prev) => !prev)}>
                        <FontAwesomeIcon icon={faToggleOn} />
                      </div>
                    </MemoHeader>
                    <MemoListBox>
                      {memo?.map((value, index) => (
                        <MemoList key={index}>
                          <span>{value.content}</span>
                          <div
                            className="delete-memo"
                            onClick={() => memoDeleteClicked(index, value.id)}
                          >
                            <FontAwesomeIcon icon={faX} />
                          </div>
                        </MemoList>
                      ))}
                    </MemoListBox>
                  </div>
                  <Form onSubmit={handleSubmit(onMemoSubmit)}>
                    <Input
                      {...register("memo")}
                      type="text"
                      name="memo"
                      placeholder="메모를 작성하세요."
                    />
                    <button>
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                  </Form>
                </MemoBox>
                <CommentBox $active={!isMemo}>
                  <div>
                    <MemoHeader>
                      <span>Comment</span>
                      <div onClick={() => setIsMemo((prev) => !prev)}>
                        <FontAwesomeIcon icon={faToggleOff} />
                      </div>
                    </MemoHeader>
                    <MemoListBox>
                      {comment.map((value, index) => (
                        <CommentList key={index}>
                          <div className="avatar"></div>
                          <div className="content">
                            <div>
                              <h3>Seo_jh</h3>
                              <p>{value.content}</p>
                            </div>
                            <div>
                              <span>{formatDate(value.created_at)}</span>
                              <button>답글 달기</button>
                            </div>
                          </div>
                        </CommentList>
                      ))}
                    </MemoListBox>
                  </div>
                  <Form onSubmit={handleSubmit(onCommentSubmit)}>
                    <Input
                      {...register("comment")}
                      type="text"
                      name="comment"
                      placeholder="댓글 달기..."
                    />
                    <button>
                      <FontAwesomeIcon icon={faArrowUp} />
                    </button>
                  </Form>
                </CommentBox>
              </MemoCommentBox>
            </BottomBox>
          </Container>
          {locationClicked ? (
            <Location onDataChange={handleLocationChange} />
          ) : null}
        </>
      )}
    </>
  );
};

export default Plan;
