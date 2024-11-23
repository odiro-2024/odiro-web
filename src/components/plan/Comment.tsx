import styled from "styled-components";
import { Form, Input, MemoBox, MemoHeader, MemoListBox } from "./Memo";
import { g1 } from "../../utils/color";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faToggleOff } from "@fortawesome/free-solid-svg-icons";
import { IComment } from "../../pages/Plan";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { getAccessToken } from "../../services/useUser";

const CommentBox = styled(MemoBox)`
  transform: ${({ $active }) =>
    $active ? "rotateY(0deg)" : " rotateY(-180deg)"};
`;

const CommentList = styled.li<{ $url: string }>`
  margin: 0.5rem 0.6rem;
  display: flex;
  word-break: break-all;
  .avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: url(${({ $url }) => $url}) center no-repeat;
    background-size: cover;
    background-color: black;
    margin-right: 0.7rem;
  }
  .content {
    width: calc(100% - 4rem);
    div:first-child {
      line-height: 1.1rem;
      span {
        display: inline;
        margin-right: 0.4rem;
        font-size: 0.9rem;
        font-weight: bold;
        color: ${g1};
      }
      p {
        display: inline;
        font-size: 15px;
      }
    }
    div:last-child {
      display: flex;
      margin-top: 0.5rem;
      font-size: 0.8rem;
      color: gray;
      span {
        margin-right: 0.7rem;
      }
      p {
        cursor: pointer;
        font-weight: bold;
        font-size: 12px;
      }
    }
  }
`;

interface IProps {
  planId: number;
  comment: IComment[];
  setComment: Dispatch<SetStateAction<IComment[]>>;
  isMemo: boolean;
  setIsMemo: Dispatch<SetStateAction<boolean>>;
  day_plan_id: number;
}

interface FormData {
  comment: string;
}

const Comment = ({
  planId,
  comment,
  setComment,
  isMemo,
  setIsMemo,
  day_plan_id,
}: IProps) => {
  const { register, getValues, handleSubmit, setValue } = useForm<FormData>();

  const onCommentSubmit = () => {
    const { comment } = getValues();
    if (!comment) return;

    const ACCESS_TOKEN = getAccessToken();
    axios
      .post(
        `/api/${planId}/comment/create`,
        {
          day_plan_id,
          content: comment,
        },
        {
          headers: {
            Authorization: `Bearer ${ACCESS_TOKEN}`,
          },
        }
      )
      .then((res) => {
        const {
          data: { write_time, comment_id },
        } = res;
        setComment((prev) => [
          {
            id: comment_id,
            content: comment,
            member_id: 1,
            created_at: write_time,
          },
          ...prev,
        ]);
        setValue("comment", "");
      });
  };

  const formatDate = (created_at: string) => {
    const milliSecDiff = Date.now() - new Date(created_at).getTime();
    const minDiff = milliSecDiff / (1000 * 60);
    const hourDiff = minDiff / 60;
    const dayDiff = hourDiff / 24;
    if (dayDiff > 1) return dayDiff.toFixed(0) + "일 전";
    if (hourDiff > 1) return hourDiff.toFixed(0) + "시간 전";
    return minDiff.toFixed(0) + "분 전";
  };

  return (
    <CommentBox $active={!isMemo}>
      <div>
        <MemoHeader>
          <span>Comment</span>
          <div onClick={() => setIsMemo((prev) => !prev)}>
            <FontAwesomeIcon icon={faToggleOff} />
          </div>
        </MemoHeader>
        <MemoListBox>
          {comment.map((value, index) => (
            <CommentList
              $url={
                "http://k.kakaocdn.net/dn/ipvVQ/btsA7YZAoMc/JZOiSiYYIoCcm3lgcOiVhK/img_640x640.jpg"
              }
              key={index}
            >
              <div className="avatar"></div>
              <div className="content">
                <div>
                  <span>진혁</span>
                  <p>{value.content}</p>
                </div>
                <div>
                  <span>{formatDate(value.created_at)}</span>
                  <p>답글 달기</p>
                </div>
              </div>
            </CommentList>
          ))}
        </MemoListBox>
      </div>
      <Form onSubmit={handleSubmit(onCommentSubmit)}>
        <Input
          {...register("comment")}
          type="text"
          name="comment"
          placeholder="댓글 달기..."
        />
        <button>
          <FontAwesomeIcon icon={faArrowUp} />
        </button>
      </Form>
    </CommentBox>
  );
};

export default Comment;
