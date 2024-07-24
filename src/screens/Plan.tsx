import styled from "styled-components";
import Header from "../components/Header";
import { mainColor } from "../color";
import PlanCalendar from "../components/calendar/PlanCalendar";
import { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import Location, { Imarkers } from "../components/Location";
import {
  faPlus,
  faPenToSquare,
  faSave,
  faX,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { isSameDay } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { toggleLocation } from "../counterSlice";
import { DragDropContext, DropResult, Droppable } from "@hello-pangea/dnd";
import DraggableLocation from "../components/DraggableLocation";
import axios from "axios";
import { useParams } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const TopBox = styled.div`
  width: 90%;
  max-width: 1300px;
  margin-top: 120px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const CheckBoxs = styled.div`
  max-width: 450px;
  width: 33%;
  display: flex;
  flex-wrap: wrap;
`;

const CheckBox = styled.div`
  padding: 12px;
  border-radius: 20px;
  margin-right: 3px;
  margin-bottom: 10px;
  text-align: center;
  font-weight: 600;
  background-color: ${mainColor};
  color: white;
`;

const Title = styled.div`
  width: 33%;
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  color: ${mainColor};
`;

const AvatarBox = styled.div`
  width: 33%;
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
  width: 90%;
  max-width: 1300px;
  margin-top: 50px;
  display: flex;
  align-items: center;
`;

const MapBox = styled.div`
  width: 55%;
  height: 450px;
  margin-right: 5%;
`;

const BottomBox = styled.div`
  width: 90%;
  max-width: 1300px;
  margin-top: 50px;
  margin-bottom: 100px;
  display: flex;
`;

const LocationBox = styled.div`
  width: 55%;
  margin-right: 2%;
  border-radius: 10px;
  border: 1px solid ${mainColor};
  color: #252525;
  > div {
    &:first-child {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      span {
        margin-top: 20px;
        margin-left: 20px;
        display: block;
        font-size: 25px;
        font-weight: 600;
      }
      div {
        margin: 10px 15px 0 0;
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        background-color: ${mainColor};
        color: white;
        border-radius: 50%;
        cursor: pointer;
      }
    }
  }
`;

const PlacePhoto = styled.div<{ $url: string }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: black;
  margin-right: 20px;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
`;

const MemoCommentBox = styled.div`
  width: 40%;
  max-width: 400px;
`;

const MemoBox = styled.div`
  min-height: 220px;
  border: 1px solid ${mainColor};
  border-radius: 10px;
  margin-bottom: 40px;
  color: #252525;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const MemoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 5px 20px 10px;
  span {
    font-size: 20px;
    font-weight: 600;
    display: block;
  }
  div {
    background-color: ${mainColor};
    width: 40px;
    height: 40px;
    border-radius: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    cursor: pointer;
  }
`;

const MemoList = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  margin: 0 8px 15px 10px;
  span {
    font-size: 17px;
  }
  div {
    background-color: #e67878;
    width: 30px;
    height: 30px;
    border-radius: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 17px;
    cursor: pointer;
  }
`;

const Form = styled.form`
  margin: 10px 0 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  button {
    border: none;
    position: absolute;
    right: -2px;
    width: 30px;
    height: 30px;
    display: block;
    margin-right: 8px;
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
  width: calc(100% - 45px);
  height: 30px;
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  text-indent: 10px;
`;

const CommentBox = styled.div`
  min-height: 220px;
  border: 1px solid ${mainColor};
  border-radius: 10px;
  color: #252525;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  > div {
    div {
      &:nth-child(2) {
        display: flex;
        flex-direction: column-reverse;
        max-height: 250px;
        overflow-y: auto;
      }
    }
  }
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 5px 30px 10px;
  span {
    font-size: 20px;
    font-weight: 600;
    display: block;
  }
`;

const CommentListNotMe = styled.div`
  margin: 15px 10px 10px 10px;
  display: flex;
  justify-content: flex-start;
  align-items: end;
  span {
    &:first-child {
      padding: 9px 13px;
      border-radius: 17px;
      background-color: ${mainColor};
      color: white;
      font-size: 17px;
      margin-right: 5px;
      max-width: 60%;
      word-break: break-all;
      line-height: 20px;
    }
    &:last-child {
      font-size: 12px;
    }
  }
`;

const CommentListMe = styled.div`
  margin: 15px 10px 10px 10px;
  display: flex;
  justify-content: flex-end;
  align-items: end;
  span {
    &:first-child {
      font-size: 12px;
    }
    &:last-child {
      padding: 10px 13px;
      border-radius: 17px;
      background-color: ${mainColor};
      color: white;
      font-size: 17px;
      margin-left: 5px;
      max-width: 60%;
      word-break: break-all;
      line-height: 20px;
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
  const [isMemoEditing, setIsMemoEditing] = useState(false);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [location, setLocation] = useState<ILocation[]>([]);
  const [memo, setMemo] = useState<IMemo[]>([]);
  const [comment, setComment] = useState<IComment[]>([]);
  const [data, setData] = useState<IData>(dataEx);
  //var data = dataEx;

  const dispatch = useDispatch();
  const onLocationClicked = () => dispatch(toggleLocation());
  const locationClicked = useSelector(
    (state: RootState) => state.counter.locationClicked
  );

  const { register, getValues, handleSubmit, setValue } = useForm<FormData>();

  const handleDateChange = (value: Date) => {
    setData({
      id: data.id,
      title: data.title,
      first_day: data.first_day,
      last_day: data.last_day,
      checkBoxValue: data.checkBoxValue,
      owner: data.owner,
      participant: data.participant,
      day_plan: data.day_plan.map((v, i) => {
        if (i !== index) {
          return v;
        } else {
          return {
            id: v.id,
            date: v.date,
            location,
            memo,
            comment,
          };
        }
      }),
    });

    var newindex = 0;
    data.day_plan.forEach((item: IDayPlan, index: number) => {
      if (value.toISOString().slice(0, 10) === item.date.slice(0, 10)) {
        newindex = index;
      }
    });
    setDate(value);
    setIndex(newindex);

    setLocation(data.day_plan[newindex].location);
    setMemo(data.day_plan[newindex].memo);
    setComment(data.day_plan[newindex].comment);

    setIsMemoEditing(false);
    setIsCommentEditing(false);
  };

  const handleLocationChange = (infoBox: Imarkers) => {
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
      .post(`/api/plan/location/create`, {
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
      })
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
    axios.get(`/api/plan/${id}`).then((res) => {
      const { data } = res;
      setData(data);
      setLocation(data.day_plan[index].location);
      setMemo(data.day_plan[index].memo);
      setComment(data.day_plan[index].comment);
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
    axios.delete(`/api/location/delete/${id}`).then((res) => {
      const { data, status } = res;
      console.log(data, status);
      setLocation((prev) => [
        ...prev.slice(0, index),
        ...prev.slice(index + 1),
      ]);
    });
  };

  const memoDeleteClicked = (index: number, id: number) => {
    axios.delete(`/api/memo/delete/${id}`).then((res) => {
      const { status } = res;
      if (status === 204) {
        setMemo((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
      }
    });
  };

  const onMemoSubmit = () => {
    const { memo } = getValues();
    if (!memo) return;
    axios
      .post("/api/memo/create", {
        day_plan_id: data.day_plan[index].id,
        content: memo,
      })
      .then((res) => {
        const {
          data: { id },
        } = res;
        setMemo((prev) => [...prev, { id, content: memo }]);
        setValue("memo", "");
      });
  };

  const onCommentSubmit = () => {
    const { comment } = getValues();
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!comment) return;
    axios
      .post(
        "/api/comment/create",
        {
          day_plan_id: data.day_plan[index].id,
          content: comment,
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
          ...prev,
          {
            id: comment_id,
            content: comment,
            member_id: 1,
            created_at: write_time,
          },
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

  const formatDate = (date: string) => {
    const hour = +date.slice(11, 13);
    const min = +date.slice(14, 16);
    const atNoon = hour >= 12 ? "오후" : "오전";
    const newHour = hour > 12 ? hour - 12 : hour;
    const newMin = min < 10 ? `0${min}` : min;
    return `${atNoon} ${newHour}:${newMin}`;
  };

  return (
    <>
      {data && (
        <>
          <Header />
          <Container>
            <TopBox>
              <CheckBoxs>
                {dataEx.checkBoxValue.map((value: boolean, index: number) => {
                  return value ? (
                    <CheckBox key={index}>{checkBoxList[index]}</CheckBox>
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
                    width: "100%",
                    height: "100%",
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
                      <PlacePhoto
                        style={{ width: "70px", height: "70px" }}
                        $url={marker.img_url}
                      ></PlacePhoto>
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
                <MemoBox>
                  <div>
                    <MemoHeader>
                      <span>메모</span>
                      {isMemoEditing ? (
                        <div onClick={() => setIsMemoEditing(false)}>
                          <FontAwesomeIcon icon={faSave} />
                        </div>
                      ) : (
                        <div onClick={() => setIsMemoEditing(true)}>
                          <FontAwesomeIcon icon={faPenToSquare} />
                        </div>
                      )}
                    </MemoHeader>
                    {memo?.map((value, index) => (
                      <MemoList key={index}>
                        <span>{value.content}</span>
                        {isMemoEditing ? (
                          <div
                            onClick={() => memoDeleteClicked(index, value.id)}
                          >
                            <FontAwesomeIcon icon={faX} />
                          </div>
                        ) : null}
                      </MemoList>
                    ))}
                  </div>
                  {isMemoEditing ? (
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
                  ) : null}
                </MemoBox>
                <CommentBox>
                  <div>
                    <CommentHeader>
                      <span>댓글</span>
                    </CommentHeader>
                    <div>
                      {comment.map((value, index) => {
                        if (value.member_id === 1) {
                          return (
                            <CommentListMe key={index}>
                              <span>{formatDate(value.created_at)}</span>
                              <span>{value.content}</span>
                            </CommentListMe>
                          );
                        } else {
                          return (
                            <CommentListNotMe key={index}>
                              <span>{value.content}</span>
                              <span>{formatDate(value.created_at)}</span>
                            </CommentListNotMe>
                          );
                        }
                      })}
                    </div>
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
