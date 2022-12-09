import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
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
import styled from "styled-components";
import '../Dis.css'
import axios from "axios";
import { json } from "react-router";
import { useNavigate } from "react-router";
const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;
const Tr = styled.tr`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  &:nth-child(odd){background-color: #e6f1ff;}
  &:nth-child(even) { background-color: #f0f7ff; }
  &:hover { background-color: #ffc5c2; cursor: pointer; }
`;
const TitleTr = styled.tr`
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;
const Td = styled.td`
  padding: 4px 20px;
  font-weight: 700;
`;

const Dis = ({ history }) => {
  const navigate = useNavigate();
  const [disData, setDisData] = useState();  

  useEffect(() => {
    axios
      .get("http://localhost:4000/dis")
      .then(({ data }) => setDisData(data));
  }, []);

  console.log(disData);

  function printData(data){
    let array = [];
    if(data){
      for(let i=0; i< data.length; i++){
        array.push(
          <Tr onClick={() => {
            navigate("/viewdis");
          }}>
            <Td>{data[i].title}</Td>
            <Td>{data[i].ID}</Td>
            <Td>{data[i].time.slice(0, 19).replace("T", " ")}</Td>
            <Td>{data[i].num}</Td>
          </Tr>
        )
      }
    }
    return array;
  }
  return (
    <Body style={{}}>
      <CardWrapper> 
        <h1 style ={{marginLeft: "100px"}}> 토론게시판</h1>
        <table style={{ width: '84%', borderCollapse: 'collapse', margin: 'auto', textAlign: "center" }}>
          <TitleTr>
            <Td>제목</Td>
            <Td>ID</Td>
            <Td>작성시간</Td>
            <Td>조회수</Td>
          </TitleTr>
          {printData(disData)}
        </table>
      </CardWrapper>
    </Body>
  );
};

export default Dis;