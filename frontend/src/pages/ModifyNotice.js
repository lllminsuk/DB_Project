import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { CardWrapper } from "../components/Card";
import { Title, SubTitle, InputText } from "./WriteNotice";
import styled from "styled-components";
import axios from "axios";
import Swal from "sweetalert2";

export const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;

const modifynotice = async (title, text, postnum) => {
  const res = await axios.post("http://localhost:4000/modifyaboard", {
    title: title,
    text: text,
    postnum: postnum,
  });
  if (res.data === true) {
    Swal.fire(
      "공지사항 수정에 성공하였습니다.",
      "공지사항 페이지로 이동합니다.",
      "success"
    );
    return true;
  } else {
    Swal.fire(
      "공지사항 등록에 실패하였습니다.",
      "제목및 내용을 입력해주세요. ",
      "error"
    );
    return false;
  }
};

const ModifyNotice = ({ history }) => {
  let navigate = useNavigate();
  const navigateState = useLocation().state;
  const postnum = navigateState && navigateState.postnum;
  var [title, setTitle] = useState([]);
  var [text, settext] = useState([]);
  const [noticeData, setNoticeData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getaboardpostnum", {
        params: { postnum: postnum },
      })
      .then(({ data }) => {
        setNoticeData(data);
        setTitle(data.title);
        settext(data.text);
      });
  }, []);

  return (
    <Body>
      <CardWrapper>
        <Title>공지사항 수정</Title>

        <SubTitle>
          제목
          <div style={{ marginTop: "-28px" }}>
            <InputText
              placeholder="게시글 제목을 입력해주세요."
              style={{ height: "25px", width: "52%" }}
              defaultValue={noticeData.length ? noticeData[0].title : ""}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        </SubTitle>

        <SubTitle>
          내용
          <div style={{ marginTop: "-28px" }}>
            <textarea
              placeholder="게시글 내용을 입력해주세요."
              style={{
                height: "100px",
                width: "52%",
                marginLeft: "200px",
                paddingLeft: "10px",
                paddingTop: "10px",
              }}
              defaultValue={noticeData.length ? noticeData[0].text : ""}
              onChange={(e) => settext(e.target.value)}
            />
          </div>
        </SubTitle>

        <hr />
        <div style={{ textAlign: "center", marginLeft: "105px", marginTop: "20px" }}>
          <button
            type="reset"
            style={{
              margin: "16px",
              height: "50px",
              width: "100px",
              backgroundColor: "white",
              border: "1px solid green",
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
          <button
            type="submit"
            style={{
              margin: "16px",
              height: "50px",
              width: "100px",
              backgroundColor: "green",
              color: "#fff",
              border: 0,
              borderRadius: "5px",
              boxShadow: 0,
            }}
            onClick={async (e) => {
              if (title === undefined) title = noticeData[0].title;
              if (text === undefined) text = noticeData[0].text;
              if (await modifynotice(title, text, postnum)) {
                navigate("/notice");
              }
            }}
          >
            수정
          </button>
        </div>
      </CardWrapper>
    </Body>
  );
};

export default ModifyNotice;
