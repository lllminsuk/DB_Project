import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  CardWrapper,
  CardHeader,
  CardHeading,
  CardBody,
  CardFieldset,
  CardInput,
  CardTitle,
  CardSelect,
  CardSelectOption,
  CardLink,
} from "../components/Card";
import "../App.css";
import styled from "styled-components";
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";
import { updateView } from "../components/clickview";

export const Body = styled.div`
  display: flex;
  align-items: 'center';
  justify-content: 'center';
  width: 100%;
`;

export const Title = styled.div`
  padding-top: 48px;
  padding-bottom : 64px;
  text-align: center;
  font-size: 40px;
  font-weight: bold;
`;

export const CardButton = styled.button`
  display: block;
  width: 140px;
  height: 60px;
  margin-left: 60px;
  padding: 12px 0;
  font-family: inherit;
  font-size: 20px;
  font-weight: 700;
  color: white;
  background-color: #037a3b;
  border: 0;
  border-radius: 5px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.02, 0.01, 0.47, 1);
  outline: 0;
  &:hover {
    box-shadow: 0 15px 15px rgba(0, 0, 0, 0.16);
    transform: translate(0, -5px);
  }
`;

function printList(list, navigate) {
  let array = [];
  for (let i = 0; i < list.length; i++) {
    array.push(
      <div className="notice_list_grid list_data" 
        style={{cursor: 'pointer', marginTop:'4px'}}
        onClick={()=>{

          updateView(list[i].num,list[i].postnum);
          navigate("/viewnotice/"+list[i].postnum,
          {state:{postnum:list[i].postnum}})}}>
        <div className="acenter"> {list[i].postnum} </div>
        <div className="text-link"> {list[i].title} </div>
        <div className="acenter"> {list[i].num} </div>
        <div className="acenter"> {list[i].date.split('T')[0]}</div>
      </div>
    )
  }
  return array;
}


const info = getInfoFromCookie();

let admin = false;
  if(info)
    if(info.token)
      admin = (info.token.type=='admin')

const Notice = ({ history }) => {
  // ????????? ?????? ????????? ?????? (db?????? ????????? ????????? ????????? ????????? ??????)

  var [noticeList, setNoticeList] = useState([]);
  console.log(noticeList);

  useEffect(() => {
    axios
      .get("http://localhost:4000/getaboard", {})
      .then(({ data }) => setNoticeList(data));
  }, []);

  let navigate = useNavigate();

  return (
    <Body>
      <CardWrapper>
        <Title>????????????</Title>

        <div className="List">
          <div className="notice_list_grid list_tit">
            <div className="acenter"> ?????? </div>
            <div> ?????? </div>
            <div className="acenter"> ????????? </div>
            <div className="acenter"> ???????????? </div>
          </div>
          {printList(noticeList, navigate)}

        </div>

        {/* ?????????????????? ?????? ????????? ??????????????? */}
        {admin? <CardButton onClick={() => navigate("/writeNotice")}>
          ?????? ??????
        </CardButton> : null}
        
      </CardWrapper>
    </Body>
  );
};

export default Notice;