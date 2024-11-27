import styled from "styled-components";
import { phone, tablet_M } from "../../utils/size";
import { g3 } from "../../utils/color";
import { ILocation } from "../../pages/Plan";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import axios from "axios";
import { Imarkers } from "../location/SearchLocation";
import { getAccessToken } from "../../services/useUser";

const Container = styled.ul`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 9;
  margin: 0 0.5rem;
  margin-top: 5rem;
  max-height: 80%;
  max-width: 99%;
  overflow: scroll;
  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
  -webkit-user-drag: none; /* Safari */
  -khtml-user-drag: none; /* Konqueror */
  -moz-user-drag: none; /* Older versions of Firefox */
  -webkit-user-select: none; /* Safari */
  -moz-user-select: none; /* Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently supported by Chrome, Opera, and Edge */
  @media (max-width: ${tablet_M}) {
    top: auto;
    bottom: 0;
    right: auto;
    left: 0;
    height: auto;
    display: flex;
  }
`;

const WishItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  position: relative;
  min-width: 120px;
  &:hover {
    div {
      opacity: 1;
    }
  }
  @media (max-width: ${tablet_M}) {
    margin-right: 0.1rem;
  }
`;

const WishPhoto = styled.div<{ $url: string }>`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background: url(${({ $url }) => $url}) no-repeat center;
  background-size: cover;
  margin-bottom: 0.5rem;
  cursor: pointer;
  @media (max-width: ${phone}) {
    width: 5rem;
    height: 5rem;
  }
`;

const WishTitle = styled.span`
  font-weight: bold;
  font-size: 0.8rem;
  background-color: white;
  border: 1px solid ${g3};
  padding: 0.5rem;
  border-radius: 1rem;
  text-align: center;
  cursor: pointer;
  white-space: nowrap;
  a {
    text-decoration: none;
    color: inherit;
  }
`;

const WishDelete = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  color: #a83d3d;
  cursor: pointer;
  opacity: 0;
  transition: 0.3s;
  @media (hover: none) {
    opacity: 1;
  }
`;

interface IProps {
  planId: number;
  wishlist: ILocation[];
  setWishlist: React.Dispatch<React.SetStateAction<ILocation[]>>;
  locationClose: () => void;
  createLocation: (infoBox: Imarkers) => void;
}

const WishList = ({
  planId,
  wishlist,
  setWishlist,
  locationClose,
  createLocation,
}: IProps) => {
  //
  const onWishEnroll = (value: ILocation, index: number) => {
    if (window.confirm("이 장소를 등록하시겠습니까?")) {
      createLocation({
        address_name: value.address_name,
        id: value.kakao_map_id,
        phone: value.phone,
        place_name: value.place_name,
        place_url: value.place_url,
        road_address_name: value.road_address_name,
        position: {
          lng: value.lng,
          lat: value.lat,
        },
        category_group_name: value.category_group_name,
        img_url: value.img_url,
      });
      onWishDelete(value.id, index);
      locationClose();
    }
  };

  const onWishDelete = (id: number, index: number) => {
    const ACCESS_TOKEN = getAccessToken();
    console.log(id);
    axios
      .delete(
        `${process.env.REACT_APP_BASE_URL}/api/${planId}/wishLocation/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const { status } = res;
        if (status === 204) {
          setWishlist((prev: ILocation[]) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ]);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    const scrollableContainer = document.querySelector(".scroll") as any;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: any) => {
      isDown = true;
      scrollableContainer.classList.add("active");
      startX = e.pageX - scrollableContainer.offsetLeft;
      scrollLeft = scrollableContainer.scrollLeft;
    };
    const handleMouseLeave = () => {
      isDown = false;
    };
    const handleMouseUp = () => {
      isDown = false;
    };
    const handleMouseMove = (e: any) => {
      if (!isDown) return; // 마우스가 클릭 상태가 아니면 스크롤 중단
      e.preventDefault();
      const x = e.pageX - scrollableContainer.offsetLeft;
      const walk = (x - startX) * 1; // 스크롤 속도 조절 (*1은 기본값)
      scrollableContainer.scrollLeft = scrollLeft - walk;
    };

    scrollableContainer?.addEventListener("mousedown", handleMouseDown);
    scrollableContainer?.addEventListener("mouseleave", handleMouseLeave);
    scrollableContainer?.addEventListener("mouseup", handleMouseUp);
    scrollableContainer?.addEventListener("mousemove", handleMouseMove);

    return () => {
      scrollableContainer?.addEventListener("mousedown", handleMouseDown);
      scrollableContainer?.addEventListener("mouseleave", handleMouseLeave);
      scrollableContainer?.addEventListener("mouseup", handleMouseUp);
      scrollableContainer?.addEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Container className="scroll">
      {wishlist.map((value: ILocation, index: number) => (
        <WishItem key={index}>
          <WishPhoto
            $url={value.img_url}
            onClick={() => onWishEnroll(value, index)}
          ></WishPhoto>
          <WishTitle>
            <Link target="_blank" to={value.place_url}>
              {value.place_name}
            </Link>
          </WishTitle>
          <WishDelete onClick={() => onWishDelete(value.id, index)}>
            <FontAwesomeIcon icon={faX} />
          </WishDelete>
        </WishItem>
      ))}
    </Container>
  );
};

export default WishList;
