import { useEffect, useState } from "react";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  cursor: pointer;
`;

const PlacePhoto = styled.div<{ $url: string }>`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: black;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
`;

const InfoArea = styled.div`
  span {
    font-size: 1.1rem;
    font-weight: bold;
    margin: 0.8rem 0 0.5rem 0;
    display: block;
  }
`;

interface Imarkers {
  position: { lat: number; lng: number };
  imgUrl: string;
}

const PlanItem = ({ data }: any) => {
  const [map, setMap] = useState<any>();
  const [markers, setMarkers] = useState<Imarkers[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const location = data.locationList;
    // 등록된 장소가 있다면
    if (location.length !== 0) {
      const bounds = new kakao.maps.LatLngBounds();
      let markers: Imarkers[] = [];

      for (var i = 0; i < location.length; i++) {
        // @ts-ignore
        markers.push({
          position: { lat: +location[i].lat, lng: +location[i].lng },
          imgUrl: location[i].imgUrl,
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
  }, [data.day_plan, map]);

  const formatDate = (date: string) => {
    return date.slice(0, 10).replace(/-/g, ".");
  };

  return (
    <Container onClick={() => navigate(`/plan/${data.id}`)}>
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "280px",
          height: "200px",
          borderRadius: "0.5rem",
        }}
        level={2}
        onCreate={setMap}
        zoomable={false}
        draggable={false}
      >
        {markers.map((marker, index) => (
          <CustomOverlayMap key={index} position={marker.position}>
            <PlacePhoto $url={marker.imgUrl}></PlacePhoto>
          </CustomOverlayMap>
        ))}
      </Map>
      <InfoArea>
        <span>{data.title}</span>
        <p>
          {formatDate(data.firstDay)} ~ {formatDate(data.lastDay)}
        </p>
      </InfoArea>
    </Container>
  );
};

export default PlanItem;
