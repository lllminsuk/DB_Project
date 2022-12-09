import React, { useState, useEffect } from "react";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardButton,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from "../components/Card";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";
import Swal from "sweetalert2";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

export const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 64px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;

export const SubTitle = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 250px;
  font-size: 20px;
  font-weight: bold;
`;

export const ImageUpload = styled.button`
  margin-left: 15px;
  width: 100px;
  height: 100px;
`;

export const InputText = styled.input`
  margin-left: 200px;
  type: text;
  padding-left: 10px;
`;

export const StateButton = styled.button`
  margin-left: 15px;
  height: 30px;
  width: 70px;
  text-align: center;
`;

const MyPage = ({ history }) => {
  const [username, setUsername] = useState("");
  var [phone, setPhone] = useState("");
  var [email, setEmail] = useState("");
  var [age, setAge] = useState("");

  var [origin_pw, setOriginPW] = useState("");
  var [new_pw, setNewPW] = useState("");
  var [confirm_pw, setConfirmPW] = useState("");

  const info = getInfoFromCookie();
  useEffect(() => {
    axios
      .get("http://localhost:4000/getuserdata", {
        headers: { token: info.token },
      })
      .then(({ data }) => {
        console.log(data);
        setUsername(data[0].name);
        setPhone(data[0].phone);
        setEmail(data[0].email);
        setAge(data[0].age);
      });
  }, []);

  return (
    <Body>
      <CardWrapper>
        <Title>회원정보수정</Title>
        
        <div
          style={{
            marginLeft: "248px",
            marginBottom: "12px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          개인정보 수정
        </div>
        <div style={{ paddingBottom: "40px" }}>
          <SubTitle>
            휴대폰 번호
            <div style={{ marginTop: "-28px" }}>
              <InputText
                style={{ height: "25px", width: "52%" }}
                defaultValue={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </SubTitle>
          <SubTitle>
            이메일
            <div style={{ marginTop: "-28px" }}>
              <InputText
                style={{ height: "25px", width: "52%" }}
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
            </div>
          </SubTitle>
          <SubTitle>
            나이
            <div style={{ marginTop: "-28px" }}>
              <InputText
                style={{ height: "25px", width: "52%" }}
                defaultValue={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
          </SubTitle>
          {
          <CardButton
            style={{ marginLeft: "950px", width: "60px" }}
            onClick={async () => {
              await axios
                .post(
                  "http://localhost:4000/privateUpdate",
                  {
                    email: email,
                    phone: phone,
                    age: age,
                  },
                  { headers: { token: info.token } }
                )
                .then(({ data }) => {
                  if (data.result === true) {
                    Swal.fire("변경사항이 적용되었습니다.", "success").then(
                      (result) => {
                        if (result.isConfirmed) window.location.reload();
                      }
                    );
                  } else {
                    Swal.fire("오류 발생", data.error, "error");
                  }
                });
            }}
          >
            변경
          </CardButton>
        }
        </div>
        
        <div
          style={{
            marginLeft: "248px",
            marginBottom: "12px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          비밀번호 수정
        </div>
        <div style={{ paddingBottom: "40px" }}>
          <SubTitle>
            현재 비밀번호
            <div style={{ marginTop: "-28px" }}>
              <InputText
                style={{ height: "25px", width: "52%" }}
                type="password"
                onChange={(e) => setOriginPW(e.target.value)}
              />
            </div>
          </SubTitle>
          <SubTitle>
            새로운 비밀번호
            <div style={{ marginTop: "-28px" }}>
              <InputText
                style={{ height: "25px", width: "52%" }}
                type="password"
                onChange={(e) => setNewPW(e.target.value)}
              />
            </div>
          </SubTitle>
          <SubTitle>
            비밀번호 확인
            <div style={{ marginTop: "-28px" }}>
              <InputText
                style={{ height: "25px", width: "52%" }}
                type="password"
                onChange={(e) => setConfirmPW(e.target.value)}
              />
            </div>
          </SubTitle>
          <CardButton
            style={{ marginLeft: "950px", width: "60px" }}
            onClick={async () => {
              if (new_pw === confirm_pw) {
                await axios
                  .post(
                    "http://localhost:4000/passwordUpdate",
                    {
                      origin_pw: origin_pw,
                      new_pw: new_pw,
                      confirm_pw: confirm_pw,
                    },
                    { headers: { token: info.token } }
                  )
                  .then(({ data }) => {
                    if (data.result === true) {
                      Swal.fire("변경사항이 적용되었습니다.", "success").then(
                        (result) => {
                          if (result.isConfirmed) window.location.reload();
                        }
                      );
                    } else {
                      Swal.fire("오류 발생", data.error, "error");
                    }
                  });
              } else {
                Swal.fire(
                  "비밀번호 변경에 실패하였습니다.",
                  "새로운 비밀번호와 비밀번호 확인에 <br>동일한 비밀번호를 입력해주세요.",
                  "error"
                );
              }
            }}
          >
            변경
          </CardButton>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default MyPage;
