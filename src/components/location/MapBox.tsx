import styled from "styled-components";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import { desktop, phone, tablet_M } from "../../utils/size";
import { Imarkers } from "./SearchLocation";

const Conntainer = styled.h2`
  flex-grow: 1;
  height: 25rem;
  position: relative;
  @media (max-width: ${desktop}) {
    height: 24rem;
  }
  @media (max-width: ${tablet_M}) {
    width: 100%;
    max-width: 30rem;
    height: 19rem;
    order: 1;
  }
  @media (max-width: ${phone}) {
    width: 100%;
    height: 17rem;
    order: 1;
  }
`;

const PlacePhoto = styled.div<{ $url: string }>`
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background-color: black;
  background-image: url(${({ $url }) => $url});
  background-size: cover;
  @media (max-width: ${tablet_M}) {
    width: 4rem;
    height: 4rem;
  }
  @media (max-width: ${phone}) {
    width: 3rem;
    height: 3rem;
  }
`;

interface IProps {
  setMap: any;
  markers: Imarkers[];
}

const MapBox = ({ setMap, markers }: IProps) => {
  return (
    <Conntainer>
      <Map
        center={{
          lat: 37.566826,
          lng: 126.9786567,
        }}
        style={{
          width: "100%",
          height: "100%",
          borderRadius: "0.5rem",
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
    </Conntainer>
  );
};

export default MapBox;
