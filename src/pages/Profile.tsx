import styled from "styled-components";
import Header from "../components/header/Header";
import { mw } from "../utils/size";
import { g1, g3, mainColor } from "../utils/color";
import { font_sharp } from "../utils/font";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Container = styled.main`
  width: 90%;
  max-width: ${mw};
  height: 100vh;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ProfileHeader = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  margin-top: 8rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  h2 {
    color: ${g1};
    font-size: 2.5rem;
    font-family: ${font_sharp};
  }
  button {
    width: 6rem;
    height: 3rem;
    border-radius: 1.5rem;
    text-align: center;
    align-content: center;
    background-color: ${mainColor};
    color: white;
    font-weight: bold;
    font-size: 15px;
    border: none;
    cursor: pointer;
  }
`;

const UserInfoBox = styled.section`
  width: 100%;
  padding: 5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
`;

const FormLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${g1};
  p {
    margin-top: 2.5rem;
    font-size: 2rem;
  }
  span {
    margin-top: 1.2rem;
    font-size: 1rem;
  }
`;

const ProfileImg = styled.div<{ url: string }>`
  width: 13rem;
  height: 13rem;
  border-radius: 50%;
  background: url(${({ url }) => url}) no-repeat center;
  background-size: cover;
`;

const Label = styled.label`
  margin: 1rem 0;
  font-weight: bold;
  color: #0095f6;
  display: block;
  cursor: pointer;
`;

const Input = styled.input`
  height: 1.6rem;
  width: 10rem;
  border-radius: 0.6rem;
  margin-top: 0.6rem;
  text-indent: 0.5rem;
  border: 1px solid ${g3};
  outline: none;
  &:focus {
    border: 2px solid ${mainColor};
  }
`;

const FormRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 10rem;
  label {
    margin-bottom: 1rem;
    font-size: 1.7rem;
    color: ${g1};
  }
`;

const TextArea = styled.textarea`
  width: 24rem;
  height: 15rem;
  border: 1px solid ${mainColor};
  resize: none;
  outline: none;
  border-radius: 1rem;
  padding: 1rem;
  line-height: 1.5rem;
  font-size: 1rem;
  overflow: auto;
`;

const data = {
  user_id: 1,
  username: "jinhyukSeo777",
  email: "tjwlsgur2556@naver.com",
  profile_img: "/images/1.jpg",
  summary: "11111111",
};

interface FormData {
  username: String;
  email: String;
  summary: String;
  password: String;
  password2: String;
}

const EditProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [newProfileImg, setNewProfileImg] = useState("");

  const { register, getValues, setValue } = useForm<FormData>();

  const clear = () => {
    setValue("username", "");
    setValue("email", "");
    setValue("summary", "");
    setValue("password", "");
    setValue("password2", "");
  };

  const onSubmit = () => {
    const { username, email, password, password2, summary } = getValues();

    if (password !== password2) {
      window.confirm("비밀번호가 일치하지 않습니다.");
      return;
    }

    console.log(username, email, password, password2, summary, avatarFile);

    setIsEditing((prev) => !prev);
    clear();
  };

  const onAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) return;
    const file = e.target.files[0];
    setAvatarFile(file);

    var reader = new FileReader();
    reader.onload = function (e: ProgressEvent<FileReader>) {
      setNewProfileImg(e.target?.result as string);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Header></Header>
      <Container>
        <ProfileHeader>
          <h2>MyPage</h2>
          {isEditing ? (
            <button onClick={onSubmit}>수정완료</button>
          ) : (
            <button onClick={() => setIsEditing(true)}>수정하기</button>
          )}
        </ProfileHeader>
        <UserInfoBox>
          <h2 hidden>유저정보</h2>
          <Form>
            <FormLeft>
              <ProfileImg
                url={newProfileImg ? newProfileImg : data.profile_img}
              ></ProfileImg>
              {isEditing && (
                <>
                  <Label htmlFor="profileImg">프로필 이미지 변경</Label>
                  <input
                    style={{ display: "none" }}
                    type="file"
                    accept="image/*"
                    id="profileImg"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      onAvatarChange(e)
                    }
                  />
                </>
              )}
              {isEditing ? (
                <>
                  <Input
                    {...register("username")}
                    type="text"
                    placeholder={data.username}
                  />
                  <Input
                    {...register("email")}
                    type="text"
                    placeholder={data.email}
                  />
                  <Input
                    {...register("password")}
                    type="password"
                    placeholder={"new password"}
                    autoComplete="off"
                  />
                  <Input
                    {...register("password2")}
                    type="password"
                    placeholder={"new password2"}
                    autoComplete="off"
                  />
                </>
              ) : (
                <>
                  <p>{data.username}</p>
                  <span>{data.email}</span>
                </>
              )}
            </FormLeft>
            <FormRight>
              <label htmlFor="summary">자기소개</label>
              {isEditing ? (
                <TextArea
                  id="summary"
                  {...register("summary")}
                  placeholder={data.summary}
                />
              ) : (
                <TextArea id="summary" readOnly value={data.summary}></TextArea>
              )}
            </FormRight>
          </Form>
        </UserInfoBox>
      </Container>
    </>
  );
};

export default EditProfile;
