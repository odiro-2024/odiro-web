import styled from "styled-components";
import Header from "../components/Header";
import { mainColor } from "../color";
import PlanCalendar from "../components/PlanCalendar";
import { useEffect, useState } from "react";
import { Map, MapMarker } from "react-kakao-maps-sdk";
import { Imarkers } from "./Test";
import { Link, useNavigate } from "react-router-dom";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
      margin: 8px 0 0 0;
      &:first-child {
        font-size: 17px;
        font-weight: 600;
      }
      &:last-child {
        color: gray;
      }
    }
  }
`;

const PlacePhoto = styled.div<{ $url: string }>`
  width: 85px;
  height: 85px;
  border-radius: 50%;
  background-color: black;
  margin-left: 20px;
  margin-right: 20px;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
`;

const MemoCommentBox = styled.div`
  width: 40%;
  max-width: 400px;
`;

const MemoBox = styled.div`
  height: 250px;
  border: 1px solid ${mainColor};
  border-radius: 10px;
  margin-bottom: 40px;
  span {
    font-size: 20px;
    font-weight: 600;
    margin: 10px;
    display: block;
  }
`;

const CommentBox = styled.div`
  height: 250px;
  border: 1px solid ${mainColor};
  border-radius: 10px;
  span {
    font-size: 20px;
    font-weight: 600;
    margin: 10px;
    display: block;
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

const data = {
  title: "여행 타이틀 입니다",
  first_day: "2024-07-08",
  last_day: "2024-07-13",
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
  member: [
    {
      name: "user1",
      email: "1@1",
      profile_image:
        "https://gongu.copyright.or.kr/gongu/wrt/cmmn/wrtFileImageView.do?wrtSn=11288960&filePath=L2Rpc2sxL25ld2RhdGEvMjAxNS8wMi9DTFM2OS9OVVJJXzAwMV8wNDQ2X251cmltZWRpYV8yMDE1MTIwMw==&thumbAt=Y&thumbSe=b_tbumb&wrtTy=10006",
    },
    {
      name: "user2",
      email: "2@2",
      profile_image:
        "https://png.pngtree.com/thumb_back/fw800/background/20231219/pngtree-pink-pastel-background-with-pink-aesthetic-sky-image_15522922.png",
    },
  ],
  day: [
    {
      location: [
        {
          address_name: "서울 중구 명동2가 25-36",
          id: "10332413",
          phone: "02-776-5348",
          place_name: "명동교자 본점",
          place_url: "http://place.map.kakao.com/10332413",
          position: { lat: 37.56255453417897, lng: 126.98561429978552 },
          road_address_name: "서울 중구 명동10길 29",
          category_group_name: "음식점",
          img_url:
            "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2FF3BDF45B8EC247F896E4FB7B7C2B5121",
        },
        {
          address_name: "서울 중구 신당동 370-69",
          id: "1065693087",
          phone: "0507-1307-8750",
          place_name: "금돼지식당",
          place_url: "http://place.map.kakao.com/1065693087",
          position: { lat: 37.55705875134064, lng: 127.01167974212188 },
          road_address_name: "서울 중구 다산로 149",
          category_group_name: "음식점",
          img_url:
            "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Fplace%2F200912A4F807401FB463DA75478F7E65",
        },
        {
          address_name: "서울 용산구 한강로1가 251-1",
          id: "220597413",
          phone: "02-794-8592",
          place_name: "몽탄",
          place_url: "http://place.map.kakao.com/220597413",
          position: { lat: 37.53599611679934, lng: 126.97224578759753 },
          road_address_name: "서울 용산구 백범로99길 50",
          category_group_name: "음식점",
          img_url:
            "https://img1.kakaocdn.net/cthumb/local/R0x420.q50/?fname=http%3A%2F%2Ft1.daumcdn.net%2Flocalfiy%2F9D96CE0AF47646C48E7B41BF852F0E5E",
        },
      ],
      todo: { memo: "this is memo" },
      comment: {
        content: "this is comment",
      },
    },
  ],
};

const Plan = () => {
  const [date, setDate] = useState("");
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<Imarkers[]>([]);
  const navigate = useNavigate();

  const handleDataChange = (value: any) => {
    setDate(value);
    console.log(date);
  };

  useEffect(() => {
    const bounds = new kakao.maps.LatLngBounds();
    let markers: Imarkers[] = [];

    for (var i = 0; i < data.day[0].location.length; i++) {
      // @ts-ignore
      markers.push({
        address_name: data.day[0].location[i].address_name,
        id: data.day[0].location[i].id,
        phone: data.day[0].location[i].phone,
        place_name: data.day[0].location[i].place_name,
        place_url: data.day[0].location[i].place_url,
        road_address_name: data.day[0].location[i].road_address_name,
        position: {
          lat: +data.day[0].location[i].position.lat,
          lng: +data.day[0].location[i].position.lng,
        },
      });
      // @ts-ignore
      bounds.extend(
        new kakao.maps.LatLng(
          data.day[0].location[i].position.lat,
          data.day[0].location[i].position.lng
        )
      );
    }
    setMarkers(markers);
    map?.setBounds(bounds);
  }, [map, date]);

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
                {data.member.slice(0, 2).map((value, index) => (
                  <Avatar key={index} $avatarurl={value.profile_image}></Avatar>
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
                first_day={data.first_day}
                last_day={data.last_day}
                onDataChange={handleDataChange}
              ></PlanCalendar>
            </MiddleBox>
            <BottomBox>
              <LocationListBox>
                <div>
                  <span>Day 1</span>
                  <div onClick={() => navigate("/test")}>
                    <FontAwesomeIcon icon={faPlus} />
                  </div>
                </div>
                {data.day[0].location.map((value, index) => (
                  <LocationList key={index}>
                    <span>{index}.</span>
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
                  <span>메모</span>
                </MemoBox>
                <CommentBox>
                  <span>댓글</span>
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
