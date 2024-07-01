import styled from "styled-components";
import Header from "../components/Header";
import { mainColor } from "../color";
import PlanCalendar from "../components/PlanCalendar";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Imarkers } from "./Test";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  faPlus,
  faPenToSquare,
  faSave,
  faX,
  faArrowUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import { format } from "date-fns";

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

const LocationListBox = styled.div`
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
        margin: 10px 15px;
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

const LocationList = styled.div`
  margin: 30px 20px;
  display: flex;
  align-items: center;
  > span {
    font-size: 22px;
  }
  > div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    div {
      background-color: ${mainColor};
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 60px;
      height: 25px;
      border-radius: 3px;
      font-size: 16px;
    }
    span {
      color: black;
      margin: 8px 0 0 0;
      &:first-child {
        font-size: 16px;
        font-weight: 600;
      }
      &:last-child {
        font-size: 15px;
        color: gray;
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
  height: 35px;
  margin: 0 8px 15px 10px;

  span {
    font-size: 20px;
    display: block;
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
  margin: 50px 0 10px 10px;
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
  height: 250px;
  border: 1px solid ${mainColor};
  border-radius: 10px;
  color: #252525;
  > div {
    display: flex;
    justify-content: space-between;
    span {
      font-size: 20px;
      font-weight: 600;
      margin: 10px;
      display: block;
    }
    div {
      background-color: ${mainColor};
      width: 40px;
      height: 40px;
      margin: 5px 5px 0 0;
      border-radius: 20px;
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 17px;
      cursor: pointer;
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
  title: "여행 타이틀 입니다",
  firstDay: new Date("2024-07-07"),
  lastDay: new Date("2024-07-11"),
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
  initializer: {
    id: 1,
    name: "name1",
    email: "1@1",
    profileImage: "@",
  },
  participants: [
    {
      id: 1,
      name: "name1",
      email: "1@1",
      profileImage:
        "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=11288960&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNS8wMi9DTFM2OS9OVVJJXzAwMV8wNDQ2X251cmltZWRpYV8yMDE1MTIwMw==&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006",
    },
    {
      id: 2,
      name: "name2",
      email: "2@2",
      profileImage:
        "https://png.pngtree.com/thumb_back/fw800/background/20231219/pngtree-pink-pastel-background-with-pink-aesthetic-sky-image_15522922.png",
    },
  ],
  dayPlan: [
    {
      id: 1,
      date: new Date("2024-07-08"),
      location: [
        {
          address_name: "서울 중구 명동2가 25-36",
          kakaoMapId: "10332413",
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
      ],
      memo: [
        {
          id: 1,
          content: "memo1",
        },
        {
          id: 2,
          content: "memo2",
        },
        {
          id: 3,
          content: "memo3",
        },
      ],
      comment: [
        {
          id: 1,
          userId: 1,
          content: "comment1",
          createAt: new Date("2024-07-13"),
        },
        {
          id: 2,
          userId: 1,
          content: "comment2",
          createAt: new Date("2024-07-14"),
        },
        {
          id: 3,
          userId: 1,
          content: "comment3",
          createAt: new Date("2024-07-15"),
        },
      ],
    },
    {
      id: 2,
      date: new Date("2024-07-09"),
      location: [
        {
          address_name: "서울 중구 신당동 370-69",
          kakaoMapId: "1065693087",
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
          userId: 1,
          content: "comment4",
          createAt: new Date("2024-07-13"),
        },
        {
          id: 5,
          userId: 1,
          content: "comment5",
          createAt: new Date("2024-07-14"),
        },
        {
          id: 6,
          userId: 1,
          content: "comment6",
          createAt: new Date("2024-07-15"),
        },
      ],
    },
    {
      id: 3,
      date: new Date("2024-07-10"),
      location: [
        {
          address_name: "서울 용산구 한강로1가 251-1",
          kakaoMapId: "220597413",
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
          userId: 1,
          content: "comment7",
          createAt: new Date("2024-07-13"),
        },
        {
          id: 8,
          userId: 1,
          content: "comment8",
          createAt: new Date("2024-07-14"),
        },
        {
          id: 9,
          userId: 1,
          content: "comment9",
          createAt: new Date("2024-07-15"),
        },
      ],
    },
    {
      id: 4,
      date: new Date("2024-07-11"),
      location: [],
      memo: [],
      comment: [],
    },
  ],
};

interface FormData {
  memo: string;
  comment: string;
}

interface ILocation {
  address_name: string;
  kakaoMapId: string;
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
  userId: number;
  content: string;
  createAt: Date;
}

const Plan = () => {
  const [date, setDate] = useState<Date>(); // 2024-07-02, 2024-07-03
  const [index, setIndex] = useState(0); // 0, 1, 2
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<Imarkers[]>([]);
  const [isMemoEditing, setIsMemoEditing] = useState(false);
  const [isCommentEditing, setIsCommentEditing] = useState(false);
  const [location, setLocation] = useState<ILocation[]>([]);
  const [memo, setMemo] = useState<IMemo[]>([]);
  const [comment, setComment] = useState<IComment[]>([]);
  const navigate = useNavigate();
  const {
    state: {
      address_name,
      kakaoMapId,
      phone,
      place_name,
      place_url,
      lat,
      lng,
      road_address_name,
      category_group_name,
      img_url,
    },
  } = useLocation();
  var data = dataEx;

  const { register, getValues, handleSubmit, setValue } = useForm<FormData>();

  const handleDateChange = (value: Date) => {
    data.dayPlan[index].location = location;
    data.dayPlan[index].memo = memo;
    data.dayPlan[index].comment = comment;

    var newindex = 0;
    data.dayPlan.forEach((item, index) => {
      if (format(value, "yyyy-MM-dd") === format(item.date, "yyyy-MM-dd")) {
        newindex = index;
      }
    });
    setDate(value);
    setIndex(newindex);

    setLocation(data.dayPlan[newindex].location);
    setMemo(data.dayPlan[newindex].memo);
    setComment(data.dayPlan[newindex].comment);

    setIsMemoEditing(false);
    setIsCommentEditing(false);
  };

  useEffect(() => {
    if (location.length !== 0) {
      const bounds = new kakao.maps.LatLngBounds();
      let markers: Imarkers[] = [];

      for (var i = 0; i < location.length; i++) {
        // @ts-ignore
        markers.push({
          address_name: location[i].address_name,
          id: location[i].kakaoMapId,
          phone: location[i].phone,
          place_name: location[i].place_name,
          place_url: location[i].place_url,
          road_address_name: location[i].road_address_name,
          position: {
            lat: +location[i].lat,
            lng: +location[i].lng,
          },
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
  }, [location]);

  useEffect(() => {
    setLocation(dataEx.dayPlan[index].location);
    setMemo(dataEx.dayPlan[index].memo);
    setComment(dataEx.dayPlan[index].comment);
  }, []);

  useEffect(() => {
    setLocation((prev) => [
      ...prev,
      {
        address_name,
        kakaoMapId,
        phone,
        place_name,
        place_url,
        lat,
        lng,
        road_address_name,
        category_group_name,
        img_url,
      },
    ]);
  }, [address_name]);

  const onMemoDeleteClicked = (index: number, id: number) => {
    setMemo((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  };

  const onSubmitValid = () => {
    const { memo } = getValues();
    // axios에서 id 받아옴
    setMemo((prev) => [...prev, { id: 1, content: memo }]);
    setValue("memo", "");
  };

  return (
    <>
      {data && (
        <>
          <Header />
          <Container>
            <TopBox>
              <CheckBoxs>
                {data.checkBoxValue.map((value: boolean, index: number) => {
                  return value ? (
                    <CheckBox key={index}>{checkBoxList[index]}</CheckBox>
                  ) : null;
                })}
              </CheckBoxs>
              <Title>{data.title}</Title>
              <AvatarBox>
                {data.participants.slice(0, 2).map((value, index) => (
                  <Avatar key={index} $avatarurl={value.profileImage}></Avatar>
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
                    <MapMarker
                      key={index}
                      position={marker.position}
                    ></MapMarker>
                  ))}
                </Map>
              </MapBox>
              <PlanCalendar
                firstDay={data.firstDay}
                lastDay={data.lastDay}
                onDataChange={handleDateChange}
              ></PlanCalendar>
            </MiddleBox>
            <BottomBox>
              <LocationListBox>
                <div>
                  <span>Day {index + 1}</span>
                  <div
                    onClick={() =>
                      navigate("/test", {
                        state: {
                          id: 1,
                        },
                      })
                    }
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
                {data.dayPlan[index].location.map((value, index) => (
                  <LocationList key={index}>
                    <Link target="_blank" to={value.place_url}>
                      <PlacePhoto $url={value.img_url} />
                    </Link>
                    <div>
                      <div>{value.category_group_name}</div>
                      <span>{value.place_name}</span>
                      <span>{value.address_name}</span>
                    </div>
                  </LocationList>
                ))}
              </LocationListBox>
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
                            onClick={() => onMemoDeleteClicked(index, value.id)}
                          >
                            <FontAwesomeIcon icon={faX} />
                          </div>
                        ) : null}
                      </MemoList>
                    ))}
                  </div>
                  {isMemoEditing ? (
                    <Form onSubmit={handleSubmit(onSubmitValid)}>
                      <Input
                        {...register("memo", { required: true })}
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
                    <span>댓글</span>
                  </div>
                </CommentBox>
              </MemoCommentBox>
            </BottomBox>
          </Container>
        </>
      )}
    </>
  );
};

export default Plan;
