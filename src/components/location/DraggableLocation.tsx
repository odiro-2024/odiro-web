import React from "react";
import { Draggable } from "@hello-pangea/dnd";
import styled from "styled-components";
import { mainColor } from "../../utils/color";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { phone } from "../../utils/size";

const List = styled.li<{ $category_len: number }>`
  margin: 5px 5px 5px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.9rem 0;
  cursor: pointer;
  user-select: none;
  background-color: white;
  &:hover,
  &:active {
    border-radius: 15px;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.1);
    .delete {
      transition-duration: 0.9s;
      opacity: 1;
    }
  }
  .location-left {
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: calc(100% - 3.5rem);
    .locaton-content {
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
        font-size: ${({ $category_len }) =>
          $category_len > 3 ? "14px" : "16px"};
      }
      span {
        margin-top: 8px;
        &:last-child {
          font-size: 15px;
          color: gray;
        }
      }
    }
  }
  .delete {
    opacity: 0;
    margin-right: 10px;
    background-color: #e67878;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
  @media (max-width: ${phone}) {
    span {
      font-size: 15px;
    }
    > div {
      &.delete {
        width: 35px;
        height: 35px;
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
  @media (max-width: ${phone}) {
    width: 60px;
    height: 60px;
  }
`;

interface IProps {
  location: {
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
  };
  index: number;
  onDeleteClick: any;
}

const DraggableLocation = ({ location, index, onDeleteClick }: IProps) => {
  const onClicked = (index: number, id: number) => {
    onDeleteClick(index, id);
  };

  return (
    <Draggable
      key={location.kakao_map_id}
      draggableId={location.kakao_map_id}
      index={index}
    >
      {(magic) => (
        <List
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          $category_len={location.category_group_name.length}
        >
          <div className="location-left">
            <Link target="_blank" to={location.place_url}>
              <PlacePhoto $url={location.img_url} />
            </Link>
            <div className="locaton-content">
              <div>{location.category_group_name}</div>
              <span>{location.place_name}</span>
              <span>{location.address_name}</span>
            </div>
          </div>
          <div className="delete" onClick={() => onClicked(index, location.id)}>
            <FontAwesomeIcon icon={faX} />
          </div>
        </List>
      )}
    </Draggable>
  );
};

export default React.memo(DraggableLocation);
