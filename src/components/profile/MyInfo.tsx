import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck as faCircleCheckSolid } from "@fortawesome/free-solid-svg-icons";
import { faCircleCheck as faCircleCheckRegular } from "@fortawesome/free-regular-svg-icons";
import { g1, g3, mainColor } from "../../utils/color";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Loader } from "../../pages/Signup";
import { ErrorMsg as errormsg } from "../../pages/Login";
import PwCheck from "../shared/PwCheck";
import { getAccessToken } from "../../services/useUser";

const Container = styled.section``;

const ProfileHeader = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  margin-top: 10rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  h2 {
    color: ${g1};
    font-size: 2.5rem;
  }
  button {
    width: 5.7rem;
    height: 2.8rem;
    border-radius: 1.5rem;
    text-align: center;
    align-content: center;
    background-color: ${mainColor};
    color: white;
    font-weight: bold;
    font-size: 1.2rem;
    border: none;
    cursor: pointer;
    font-family: "HakgyoansimNadeuri";
  }
`;

const UserInfoBox = styled.section`
  width: 100%;
  padding: 5rem 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${g1};
  p {
    margin-top: 2.5rem;
    font-size: 1.9rem;
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
  font-size: 1.1rem;
`;

const InputBox = styled.div`
  position: relative;
`;

const Input = styled.input`
  height: 2rem;
  width: 12rem;
  margin: 0.3rem 0;
  border-radius: 1rem;
  text-indent: 0.8rem;
  border: 1px solid ${g3};
  outline: none;
  &:focus {
    border: 2px solid ${mainColor};
  }
`;

const DuplicateCheck = styled.div`
  position: absolute;
  right: -1.8rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.3rem;
  color: ${mainColor};
  cursor: pointer;
`;

const ProfileLoader = styled(Loader)`
  width: 12px;
  height: 12px;
  right: -3.7rem;
  top: 0.5rem;
`;

const ErrorMsg = styled(errormsg)``;

interface IData {
  id: number;
  email: string;
  password: string;
  username: string;
  profileImage: string;
}

interface FormData {
  username: string;
  email: string;
  password: string;
  password2: string;
  emailVerify: string;
}

const MyInfo = () => {
  const [data, setData] = useState<IData>();
  const [isEditing, setIsEditing] = useState(false);
  const [avatarFile, setAvatarFile] = useState<File>();
  const [newProfileImg, setNewProfileImg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [usernameValid, setUsernameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [emailVerifing, setEmailVerifing] = useState(false);
  const [emailVerifyValid, setEmailVerifyValid] = useState(false);
  const [usernameValidLoader, setUsernameValidLoader] = useState(false);
  const [emailValidLoader, setEmailValidLoader] = useState(false);
  const [emailVerifyValidLoader, setEmailVerifyValidLoader] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const ACCESS_TOKEN = getAccessToken();
    axios
      .get("/api/mypage", {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const { register, getValues, setValue } = useForm<FormData>();

  const clear = () => {
    setValue("username", "");
    setValue("email", "");
    setValue("password", "");
    setValue("password2", "");
    setEmailVerifing(false);
    setErrorMsg("");
  };

  const onSubmit = () => {
    if (!usernameValid || !emailValid) return;
    if (emailVerifing && !emailVerifyValid) return;

    const { username, email, password, password2 } = getValues();

    if (password !== password2) {
      setErrorMsg("비밀번호가 일치하지 않습니다.");
      return;
    }

    const formData = new FormData();

    // 필요한 필드만 추가
    if (username !== data?.username) formData.append("username", username);
    if (email !== data?.email) formData.append("email", email);
    if (password !== "") formData.append("password", password);

    if (avatarFile && avatarFile.size > 0) {
      // avatarFile이 존재하고 유효한 경우만 추가
      formData.append("file", avatarFile);
    }

    const ACCESS_TOKEN = localStorage.getItem("accessToken");
    // 요청 전송
    axios
      .patch("/api/update", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // FormData 사용 시 헤더 설정
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      })
      .then(() => {
        setIsEditing(false);
        clear();
        window.location.reload();
      })
      .catch((error) => setErrorMsg(error.response.data.message));
  };

  const onPwCorrect = () => {
    setIsEditing(true);
    setValue("username", data?.username || "");
    setValue("email", data?.email || "");
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

  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === data?.username) {
      setUsernameValid(true);
    } else {
      setUsernameValid(false);
    }
  };

  const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === data?.email) {
      setEmailValid(true);
      setEmailVerifing(false);
    } else {
      setEmailValid(false);
    }
  };

  const onUsernameCheck = () => {
    if (usernameValid) return;
    const { username } = getValues();
    setUsernameValidLoader(true);
    //
    axios
      .get("/api/user/check-username", {
        params: { username },
      })
      .then((res) => {
        if (res.data) {
          setErrorMsg("유저네임이 존재합니다.");
          setUsernameValidLoader(false);
          return;
        }
        setUsernameValidLoader(false);
        setUsernameValid(true);
      })
      .catch((error) => console.log(error));
  };

  const onEmailCheck = () => {
    if (emailValid) return;
    const { email } = getValues();
    //
    setEmailValidLoader(true);
    const emailSuccessCallback = setTimeout(() => {
      setEmailValid(true);
      setEmailVerifing(true);
      setEmailVerifyValid(false);
      setEmailValidLoader(false);
    }, 500);
    axios
      .get("/api/emails/verification-requests", { params: { email } })
      .then(() => {})
      .catch((error) => {
        setErrorMsg("이메일이 존재합니다.");
        setEmailValidLoader(false);
        clearTimeout(emailSuccessCallback);
      });
    //
  };

  const onEmailVerifyCheck = () => {
    if (emailVerifyValid) return;
    const { email, emailVerify } = getValues();
    setEmailVerifyValidLoader(true);
    //
    axios
      .get("/api/emails/verifications", {
        params: {
          email,
          code: emailVerify,
        },
      })
      .then((res) => {
        if (!res.data) {
          setEmailVerifyValidLoader(false);
          setErrorMsg("인증번호가 틀립니다.");
          return;
        }
        setEmailVerifyValid(true);
        setEmailVerifyValidLoader(false);
      })
      .catch((error) => setErrorMsg(error.response.data.message));
  };

  return (
    <Container>
      <ProfileHeader>
        <h2>MyPage</h2>
        {isEditing ? (
          <button onClick={onSubmit}>수정완료</button>
        ) : (
          <button onClick={() => setModalOpen(true)}>수정하기</button>
        )}
      </ProfileHeader>
      <UserInfoBox>
        <Form>
          <ProfileImg
            url={newProfileImg ? newProfileImg : data?.profileImage || ""}
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
              <InputBox>
                <Input
                  {...register("username")}
                  type="text"
                  placeholder={data?.username}
                  onChange={(e) => onUsernameChange(e)}
                />
                <DuplicateCheck onClick={onUsernameCheck}>
                  {usernameValid ? (
                    <FontAwesomeIcon icon={faCircleCheckSolid} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleCheckRegular} />
                  )}
                </DuplicateCheck>
                {usernameValidLoader && <ProfileLoader></ProfileLoader>}
              </InputBox>
              <InputBox>
                <Input
                  {...register("email")}
                  type="email"
                  placeholder={data?.email}
                  onChange={(e) => onEmailChange(e)}
                />
                <DuplicateCheck onClick={onEmailCheck}>
                  {emailValid ? (
                    <FontAwesomeIcon icon={faCircleCheckSolid} />
                  ) : (
                    <FontAwesomeIcon icon={faCircleCheckRegular} />
                  )}
                </DuplicateCheck>
                {emailValidLoader && <ProfileLoader></ProfileLoader>}
              </InputBox>
              {emailVerifing && (
                <InputBox>
                  <Input
                    {...register("emailVerify")}
                    type="text"
                    onChange={() => setEmailVerifyValid(false)}
                    placeholder="인증번호를 입력하세요."
                  />
                  <DuplicateCheck onClick={onEmailVerifyCheck}>
                    {emailVerifyValid ? (
                      <FontAwesomeIcon icon={faCircleCheckSolid} />
                    ) : (
                      <FontAwesomeIcon icon={faCircleCheckRegular} />
                    )}
                  </DuplicateCheck>
                  {emailVerifyValidLoader && <ProfileLoader></ProfileLoader>}
                </InputBox>
              )}
              {data?.password && (
                <>
                  <InputBox>
                    <Input
                      {...register("password")}
                      type="password"
                      placeholder={"new password"}
                      autoComplete="off"
                    />
                  </InputBox>
                  <InputBox>
                    <Input
                      {...register("password2")}
                      type="password"
                      placeholder={"new password2"}
                      autoComplete="off"
                    />
                  </InputBox>
                </>
              )}
              <ErrorMsg>{errorMsg}</ErrorMsg>
            </>
          ) : (
            <>
              <p>{data?.username}</p>
              <span>{data?.email}</span>
            </>
          )}
        </Form>
      </UserInfoBox>
      {modalOpen && (
        <PwCheck setModalOpen={setModalOpen} onPwCorrect={onPwCorrect} />
      )}
    </Container>
  );
};

export default MyInfo;
