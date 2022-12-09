import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { getTokenFromCookie } from "../components/Auth";

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
import axios from "axios";
import { getInfoFromCookie } from "../components/Auth";
import { updateRecentStock } from "../components/clickStock";

const Body = styled.div`
  display: flex;
  align-items: "center";
  justify-content: "center";
  width: 100%;
`;
const Title = styled.div`
  padding-top: 48px;
  padding-bottom: 30px;
  padding-left: 90px;
  font-size: 30px;
  font-weight: 600;
`;
const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 90px;
  align-items: left;
  justify-content: left;
`;
const NewsTitle = styled.div`
  padding-bottom: 10px;
  font-size: 18px;
  float: left;
`;
const NewsOffice = styled.div`
  padding-bottom: 10px;
  font-size: 15px;
  color: #808080;
  float: left;
  padding-left: 50px;
  padding-top: 3px;
`;
const Ranking = styled.div`
  width: 40%;
  height: 420px;
  padding-top: 80px;
  padding-left: 90px;
  float: left;
  align-items: center;
  text-align: center;
`
const Searched = styled.div`
  width: 100%;
  padding-top: 60px;
  padding-right: 90px;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
`
const RankTitle = styled.div`
  text-align: center;
  align-items: center;
  font-size: 30px;
  font-weight: 600;
`
const Number = styled.div`
  width: 4%;
  padding-left: 25px;
  padding-bottom: 10px;
  padding-top: 4px;
  font-size: 20px;
`
const RankName = styled.div`
  width: 36%;
  padding-left: 10px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 20px;
`
const Info = styled.div`
  width: 16%;
  padding-bottom: 10px;
  padding-top: 4px;
  text-align: right;
  font-size: 20px;
`
const SearchName = styled.div`
  width: 105px;
  height: 18px;
  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 10px;
  text-align: left;
  font-size: 15px;
`
const SearchInfo = styled.div`
  width: 70px;
  height: 14px;
  padding-bottom: 10px;
  padding-right: 10px;
  padding-top: 4px;
  text-align: right;
  font-size: 15px;
`
const Tr = styled.tr`
  &:hover { background-color: #ffc5c2; cursor: pointer; }
`;
const TitleTr = styled.tr`
  border-bottom: 1px solid #c8c8c8;
`;
const Td = styled.td`
  padding: 4px 20px;
  font-size: 14px;
  text-align: right;
`;
const Td1 = styled.td`
  padding: 4px 20px;
  font-size: 14px;
  text-align: left;
`;

const Home = ({ history }) => {
  const info = getInfoFromCookie();
  const navigate = useNavigate();
  const token = getTokenFromCookie();

  var [risingRate, setRisingRate] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/risingRate")
      .then(({ data }) => setRisingRate(data));
  }, []);

  var [fallingRate, setFallingRate] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/fallingRate")
      .then(({ data }) => setFallingRate(data));
  }, []);

  var [volume, setVolume] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/volume")
      .then(({ data }) => setVolume(data));
  }, []);

  var [marketCap, setMarketCap] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:4000/marketCap")
      .then(({ data }) => setMarketCap(data));
  }, []);

  var [recentStock, setRecentStock] = useState([]);
  useEffect((e) => {
    axios
      .get("http://localhost:4000/getRecentStock", {
        headers: { token: token },
      })
      .then(({ data }) => setRecentStock(data));
  }, []);

  console.log(recentStock);
  function printRanking(Data){
    let array = [];
    for(let i = 0; i< Data.length; i++){
      let price = Data[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      let difference = Data[i].difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      if(Data[i].difference > 0)
        array.push(
          <div style={{display: "flex", cursor: "pointer"}}
            onClick={()=>{
              if(token) updateRecentStock(Data[i].code);
              navigate("/stockinfo", { state: { code: Data[i].code } });
            }}>
            <Number>{i+1}.</Number><RankName>{Data[i].name}</RankName><Info>{price}</Info><Info style={{color:'red'}}>+{difference}</Info><Info style={{color:'red'}}>+{Data[i].rate.toFixed(2)}%</Info>
          </div>
        )
      else if(Data[i].difference < 0)
        array.push(
          <div style={{display: "flex", cursor: "pointer"}}
          onClick={()=>{
            if(token) updateRecentStock(Data[i].code);
            navigate("/stockinfo", { state: { code: Data[i].code } });
          }}>
            <Number>{i+1}.</Number><RankName>{Data[i].name}</RankName><Info >{price}</Info><Info style={{color:'blue'}}>{difference}</Info><Info style={{color:'blue'}}>{Data[i].rate.toFixed(2)}%</Info>
          </div>
        )
      else
        array.push(
          <div style={{display: "flex", cursor: "pointer"}}
          onClick={()=>{
            if(token) updateRecentStock(Data[i].code);
            navigate("/stockinfo", { state: { code: Data[i].code } });
          }}>
            <Number>{i+1}.</Number><RankName>{Data[i].name}</RankName><Info>{price}</Info><Info>-</Info><Info>0.00%</Info>
          </div>
        )
    }
    return array
  }

  function printRecentStock(data){
    let array = [];
    for(let i = 0 ; i< data.length; i++){
      if(data[i].rate>0)
        array.push(
          <div style={{display: "flex", cursor: "pointer"}}
          onClick={()=>{
            updateRecentStock(data[i].code);
            navigate("/stockinfo", { state: { code: data[i].code } })
          }}>
            <SearchName>{data[i].name}</SearchName><SearchInfo>{data[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</SearchInfo><SearchInfo style={{color:'red'}}>+{data[i].rate.toFixed(2)}%</SearchInfo>
          </div>
        )
      else if(data[i].rate<0)
      array.push(
        <div style={{display: "flex", cursor: "pointer"}}
        onClick={()=>{
          updateRecentStock(data[i].code);
          navigate("/stockinfo", { state: { code: data[i].code } })
        }}>
          <SearchName>{data[i].name}</SearchName><SearchInfo>{data[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</SearchInfo><SearchInfo style={{color:'blue'}}>{data[i].rate.toFixed(2)}%</SearchInfo>
        </div>
      )
      else
      array.push(
        <div style={{display: "flex", cursor: "pointer"}}
        onClick={()=>{
          updateRecentStock(data[i].code);
          navigate("/stockinfo", { state: { code: data[i].code } })
        }}>
          <SearchName>{data[i].name}</SearchName><SearchInfo>{data[i].price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</SearchInfo><SearchInfo>0.00%</SearchInfo>
        </div>
      )
    }
    return array
  }
  
  return (
    <Body style={{}}>
      <CardWrapper>

        <div style={{ float: "left", width: "65%" }}>
          <Title>오늘의 뉴스</Title>
          <NewsWrapper>
            <div>
              <NewsTitle>[마감시황]코스피, 6거래일 만에 상승…2389선 마감</NewsTitle><NewsOffice>뉴시스</NewsOffice>
            </div>
            <div>
              <NewsTitle>[코스피(마감)] 17.96포인트(0.76%) 오른 2389.04 마감</NewsTitle><NewsOffice>서울경제</NewsOffice>
            </div>
            <div>
              <NewsTitle>[특징주] 증권가 호평에 9% 급등했던 쏘카, 하루 만에 반락</NewsTitle><NewsOffice>조선비즈</NewsOffice>
            </div>
            <div>
              <NewsTitle>[시황] 코스피, 외인 매도에 2260대 마감</NewsTitle><NewsOffice>데일리안</NewsOffice>
            </div>
            <div>
              <NewsTitle>[시황] 코스피, 외인 매도에 2260대 마감</NewsTitle><NewsOffice>데일리안</NewsOffice>
            </div>
          </NewsWrapper>
        </div>

        <div style={{ float: "left", width: "35%" }}>
          <Searched>최근 검색</Searched><hr style={{ borderTop: '0.7px #c8c8c8', width: "60%" }}/>
          {info ? (
            <div style={{ float: "left", width: "61%", height: "150px", marginLeft: "90px", background: "#F0FFF0" }}>
              {printRecentStock(recentStock)}
            </div>
            ) : (
            <div style={{ width: "60%", height: "150px", marginLeft: "90px", background: "#F0FFF0" }}>
              <div style={{ width: "50%", height: "50%", margin: "auto", paddingTop: "30px", textAlign: "center" }}>
                로그인 하시면,<br />나의 최근 검색을<br />볼 수 있습니다.
                <button style={{ marginTop: "5px" }} onClick={()=>{
                  navigate("/login")
                }}>
                로그인
                </button>
              </div>
            </div>
          )}
        </div>

        <hr style={{ borderTop: '0.5px #c8c8c8', width: '87%' }}/>

        <Ranking>
          <RankTitle>상승률 상위</RankTitle><hr style={{ borderTop: '0.7px #c8c8c8' }}/>
          {printRanking(risingRate)}
        </Ranking>
        <Ranking>
          <RankTitle>하락률 상위</RankTitle><hr style={{ borderTop: '0.7px #c8c8c8' }}/>
          {printRanking(fallingRate)}
        </Ranking>
        <Ranking>
          <RankTitle>거래량 상위</RankTitle><hr style={{ borderTop: '0.7px #c8c8c8' }}/>
          {printRanking(volume)}
        </Ranking>
        <Ranking>
          <RankTitle>시가총액 상위</RankTitle><hr style={{ borderTop: '0.7px #c8c8c8' }}/>
          {printRanking(marketCap)}
        </Ranking>
      </CardWrapper>
    </Body>
  );
};

export default Home;
