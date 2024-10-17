import { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
  width: 150px;
  cursor: pointer;
`;

const DropdownToggle = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  background-color: white;
  text-align: center;
  border-radius: 1rem;
`;

const DropdownMenu = styled.ul`
  position: absolute;
  top: 3rem;
  width: 100%;
  border-radius: 1rem;
  right: 0;
  border: 1px solid #ccc;
  background-color: white;
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 9;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
  overflow: auto;
  max-height: 15rem;
  &::-webkit-scrollbar {
    width: 0px;
  }
  li {
    padding: 10px;
    border-bottom: 1px solid #eee;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #f0f0f0;
    }
    &:last-child {
      border-bottom: none;
    }
  }
`;

interface IProps {
  category: string;
  data: string[];
  setState: React.Dispatch<React.SetStateAction<string>>;
}

const Dropdown = ({ category, data, setState }: IProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState(category); // 드롭다운의 현재 value 값

  const toggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleOptionClick = (value: string) => {
    setValue(value);
    setIsOpen(false);
    setState(value);
  };

  return (
    <Container>
      <DropdownToggle onClick={toggleDropdown}>{value}</DropdownToggle>
      {isOpen && (
        <DropdownMenu>
          {data.map((value, index) => (
            <li key={index} onClick={() => handleOptionClick(value)}>
              {value}
            </li>
          ))}
        </DropdownMenu>
      )}
    </Container>
  );
};

export default Dropdown;
