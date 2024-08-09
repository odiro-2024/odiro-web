import styled from "styled-components";
import { g1, mainColor } from "../../utils/color";
import { Dispatch, SetStateAction } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faToggleOn, faX } from "@fortawesome/free-solid-svg-icons";
import { IMemo } from "../../pages/Plan";
import { font_cute } from "../../utils/font";
import axios from "axios";
import { ACCESS_TOKEN } from "../../services/useUser";
import { useForm } from "react-hook-form";

export const MemoBox = styled.div<{ $active: boolean }>`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  border: 1px solid ${mainColor};
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: 0.9s;
  backface-visibility: hidden;
  transform: ${({ $active }) =>
    $active ? "rotateY(0deg)" : " rotateY(180deg)"};
  > div:first-child {
    height: calc(100% - 7rem);
  }
`;

export const MemoHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0.8rem 0.7rem 0.5rem 0.7rem;
  span {
    font-family: ${font_cute};
    color: ${g1};
    font-size: 1.2rem;
    font-weight: bold;
    display: block;
  }
  div {
    color: ${mainColor};
    cursor: pointer;
    font-size: 2rem;
  }
`;

export const MemoListBox = styled.ul`
  max-height: 100%;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;
  &::-webkit-scrollbar {
    width: 0px;
  }
  padding-bottom: 1rem;
`;

const MemoList = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 0.1rem;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  word-break: break-all;
  span {
    width: calc(100% - 2rem);
    font-size: 1rem;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background-color: ${mainColor};
      top: 50%;
      transform: translateY(-50%);
      left: -1rem;
    }
  }
  .delete-memo {
    background-color: #e67878;
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    color: white;
    text-align: center;
    align-content: center;
    cursor: pointer;
    opacity: 0;
  }
  &:hover,
  &:active {
    border-radius: 15px;
    box-shadow: 4px 2px 10px 0px rgba(0, 0, 0, 0.1);
    .delete-memo {
      transition-duration: 0.9s;
      opacity: 1;
    }
  }
`;

export const Form = styled.form`
  margin: 0.5rem 0 0.6rem 0.5rem;
  position: relative;
  padding-top: 0.5rem;
  background-color: white;
  button {
    border: none;
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    height: 2rem;
    display: block;
    background-color: ${mainColor};
    color: white;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const Input = styled.input`
  width: calc(100% - 3.2rem);
  height: 1.8rem;
  border-radius: 1rem;
  border: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
  text-indent: 10px;
`;

interface IProps {
  memo: IMemo[];
  setMemo: Dispatch<SetStateAction<IMemo[]>>;
  isMemo: boolean;
  setIsMemo: Dispatch<SetStateAction<boolean>>;
  day_plan_id: number;
}

interface FormData {
  memo: string;
}

const Memo = ({ memo, setMemo, isMemo, setIsMemo, day_plan_id }: IProps) => {
  const { register, getValues, handleSubmit, setValue } = useForm<FormData>();

  const onMemoSubmit = () => {
    const { memo } = getValues();
    if (!memo) return;
    axios
      .post(
        "/api/memo/create",
        {
          day_plan_id,
          content: memo,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const {
          data: { id },
        } = res;
        setMemo((prev) => [{ id, content: memo }, ...prev]);
        setValue("memo", "");
      })
      .catch((error) => console.log(error));
  };

  const memoDeleteClicked = (index: number, id: number) => {
    axios
      .delete(`/api/memo/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        const { status } = res;
        if (status === 204) {
          setMemo((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1),
          ]);
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <MemoBox $active={isMemo}>
      <div>
        <MemoHeader>
          <span>Memo</span>
          <div onClick={() => setIsMemo((prev) => !prev)}>
            <FontAwesomeIcon icon={faToggleOn} />
          </div>
        </MemoHeader>
        <MemoListBox>
          {memo?.map((value, index) => (
            <MemoList key={index}>
              <span>{value.content}</span>
              <div
                className="delete-memo"
                onClick={() => memoDeleteClicked(index, value.id)}
              >
                <FontAwesomeIcon icon={faX} />
              </div>
            </MemoList>
          ))}
        </MemoListBox>
      </div>
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
    </MemoBox>
  );
};

export default Memo;
