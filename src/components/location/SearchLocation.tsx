import { styled } from "styled-components";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { CustomOverlayMap, Map, MapMarker } from "react-kakao-maps-sdk";
import { Link } from "react-router-dom";
import { toggleLocation } from "../../contexts/counterSlice";
import { useDispatch, useSelector } from "react-redux";
import { tablet_L } from "../../utils/size";
import { tablet_M } from "../../utils/size";
import { RootState } from "../../contexts/store";
import Modal from "../shared/Modal";

const LocationBox = styled.div`
  height: 70%;
  width: 80%;
  max-width: 1200px;
  height: 70%;
  border-radius: 5px;
  background-color: white;
  position: relative;
  @media (max-width: ${tablet_L}) {
    width: 100%;
    height: 100%;
  }
`;

const MapWrap = styled.div`
  width: 100%;
  height: 100%;
`;

const Form = styled.form`
  position: absolute;
  top: 30px;
  left: 15px;
  z-index: 9;
`;

const Input = styled.input`
  width: 170px;
  height: 30px;
  border-radius: 15px;
  outline: none;
  border: 2px solid gray;
  text-indent: 10px;
`;

const Divs = styled.ul`
  position: absolute;
  top: 70px;
  left: 15px;
  z-index: 9;
  max-height: 70%;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  @media (max-width: ${tablet_M}) {
    max-height: 25%;
  }
`;

const Div = styled.li`
  width: 240px;
  background-color: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  span {
    font-size: 15px;
    margin: 15px 15px 0 20px;
    &:first-child {
      cursor: pointer;
    }
    &:nth-child(3) {
      color: gray;
    }
    &:last-child {
      color: green;
      margin-bottom: 15px;
    }
  }
`;

const InfoBox = styled.div`
  background-color: white;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  > span {
    font-size: 15px;
    margin: 15px 15px 0 20px;
    &:first-child {
      cursor: pointer;
      margin-top: 25px;
    }
    &:nth-child(3) {
      color: gray;
    }
    &:nth-child(4) {
      color: green;
      margin-bottom: 15px;
    }
  }
  div {
    display: flex;
    margin: 20px 0 15px 0;
    width: 100%;
    justify-content: flex-end;
    span {
      &:first-child {
        background-color: #dd4141;
        padding: 5px;
        color: white;
        border-radius: 5px;
        cursor: pointer;
      }
      &:last-child {
        background-color: #56ce31;
        padding: 5px;
        color: white;
        border-radius: 5px;
        margin: 0 12px 0 10px;
        cursor: pointer;
      }
    }
  }
`;

interface FormData {
  keyword: string;
}

export interface Imarkers {
  address_name: string;
  id: string;
  phone: string;
  place_name: string;
  place_url: string;
  road_address_name: string;
  position: {
    lng: number;
    lat: number;
  };
  category_group_name: string;
  img_url: string;
}

const SearchLocation = ({ onDataChange }: any) => {
  const [map, setMap] = useState<any>();
  const [infoBox, setInfoBox] = useState<Imarkers | null>();
  const [markers, setMarkers] = useState<Imarkers[]>([]);
  var temporaryMarkers: Imarkers[] = [];

  const dispatch = useDispatch();
  const onLocationClicked = () => dispatch(toggleLocation());
  const locationClicked = useSelector(
    (state: RootState) => state.counter.locationClicked
  );

  const { register, getValues, handleSubmit } = useForm<FormData>();

  const fetchData = () => {
    const { keyword } = getValues();
    const ps = new kakao.maps.services.Places();

    ps.keywordSearch(keyword, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers: Imarkers[] = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            address_name: data[i].address_name,
            id: data[i].id,
            phone: data[i].phone,
            place_name: data[i].place_name,
            place_url: data[i].place_url,
            road_address_name: data[i].road_address_name,
            position: {
              lat: +data[i].y,
              lng: +data[i].x,
            },
            category_group_name: data[i].category_group_name,
            img_url: "",
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        temporaryMarkers = [...temporaryMarkers, ...markers];
        if (_pagination.current === 3 || _pagination.hasNextPage === false) {
          setMarkers(temporaryMarkers);
          map.setBounds(bounds);
        } else {
          _pagination.nextPage();
        }
      }
    });
  };

  const onSubmit = async () => {
    temporaryMarkers = [];
    setInfoBox(null);
    fetchData();
  };

  const onSideDivClick = ({ lng, lat }: { lng: number; lat: number }) => {
    const bounds = new kakao.maps.LatLngBounds();
    bounds.extend(new kakao.maps.LatLng(lat, lng));
    map.setBounds(bounds);
  };

  const onEnrollClick = () => {
    if (window.confirm("이 장소를 등록하시겠습니까?")) {
      onDataChange(infoBox);
      onLocationClicked();
    }
  };

  return (
    <Modal active={locationClicked} modalClose={onLocationClicked}>
      <LocationBox>
        <MapWrap>
          <Map
            center={{
              lat: 37.566826,
              lng: 126.9786567,
            }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "1rem",
            }}
            level={3}
            onCreate={setMap}
          >
            {infoBox && (
              <CustomOverlayMap position={infoBox.position}>
                <InfoBox>
                  <span>
                    <Link target="_blank" to={infoBox.place_url}>
                      {infoBox.place_name}
                    </Link>
                  </span>
                  <span>{infoBox.address_name}</span>
                  <span>{infoBox.road_address_name}</span>
                  <span>{infoBox.phone}</span>
                  <div>
                    <span onClick={() => setInfoBox(null)}>닫기</span>
                    <span onClick={onEnrollClick}>등록</span>
                  </div>
                </InfoBox>
              </CustomOverlayMap>
            )}
            {markers.map((marker, index) => (
              <MapMarker
                key={index}
                position={marker.position}
                onClick={() => setInfoBox(marker)}
              ></MapMarker>
            ))}
          </Map>
        </MapWrap>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            {...register("keyword", { required: true })}
            type="text"
            placeholder="위치를 입력하세요"
          />
        </Form>
        <Divs>
          {markers.map((value, index) => (
            <Div onClick={() => onSideDivClick(value.position)} key={index}>
              <span>{value.place_name}</span>
              <span>{value.address_name}</span>
              <span>{value.road_address_name}</span>
              <span>{value.phone}</span>
            </Div>
          ))}
        </Divs>
      </LocationBox>
    </Modal>
  );
};

export default SearchLocation;
