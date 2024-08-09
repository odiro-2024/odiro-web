import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ILocation } from "../../pages/Plan";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useDispatch } from "react-redux";
import { toggleLocation } from "../../contexts/counterSlice";
import DraggableLocation from "../location/DraggableLocation";
import axios from "axios";
import { ACCESS_TOKEN } from "../../services/useUser";
import styled from "styled-components";
import { g1, mainColor } from "../../utils/color";
import { tablet_M } from "../../utils/size";
import { Dispatch, SetStateAction } from "react";

const LocationBox = styled.div`
  flex-grow: 1;
  border-radius: 1rem;
  border: 1px solid ${mainColor};
  .location-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    span {
      margin: 1.3rem;
      display: block;
      font-size: 25px;
      font-weight: bold;
      color: ${g1};
    }
    button {
      border: none;
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

  @media (max-width: ${tablet_M}) {
    min-height: 15rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    max-width: 30rem;
    width: 100%;
  }
  @media (max-width: 480px) {
  }
`;

interface IProps {
  index: number;
  location: ILocation[];
  setLocation: Dispatch<SetStateAction<ILocation[]>>;
}

const Location = ({ index, location, setLocation }: IProps) => {
  const dispatch = useDispatch();
  const onLocationClicked = () => dispatch(toggleLocation());

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return;
    setLocation((prev: ILocation[]) => {
      const copy = [...prev];
      const aa = copy.splice(source.index, 1);
      copy.splice(destination?.index, 0, aa[0]);
      return copy;
    });
  };

  const locationDeleteClicked = (index: number, id: number) => {
    axios
      .delete(`/api/location/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        const { status } = res;
        if (status === 204) {
          setLocation((prev: ILocation[]) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ]);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <LocationBox>
      <div className="location-header">
        <span>Day {index + 1}</span>
        <button onClick={onLocationClicked}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="index">
          {(magic) => (
            <ul ref={magic.innerRef} {...magic.droppableProps}>
              {location.map((value, index) => (
                <DraggableLocation
                  key={index}
                  location={value}
                  index={index}
                  onDeleteClick={locationDeleteClicked}
                />
              ))}
              {magic.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </LocationBox>
  );
};

export default Location;
