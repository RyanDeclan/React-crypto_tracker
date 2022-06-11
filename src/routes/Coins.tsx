import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { fetchCoins } from "../api";
import { Helmet } from "react-helmet";
import { useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

import CoinDetail from "./CoinDetail";
const Container = styled.div`
  padding: 0px 20px;
  max-width: 90vw;
  margin: 0 auto;
  // 이렇게 max-width랑 margin을 해주면 화면을 크게 했을때도
  //모바일화면처럼 가운데 위치하게된다.
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}



const Box = styled.div`
 display: flex;
 justify-content: space-between;
 align-items: center;
 padding 0 2vw;
 

`

const BoxHeader = styled.div`
background-color: white;
color: ${(props) => props.theme.textColor};
border-radius: 15px;
margin-bottom: 10px;
display: flex;
justify-content: space-between;
align-items: center;
padding 0  2vw;
`

const HeaderName = styled.div`
  height: 5vh;
  display: flex;
  align-items: center;
  &:nth-child(1) {
    padding-left:3vw
  }
  &:nth-child(2) {
    padding-left:14vw
  }
  &:nth-child(3) {
    padding-right:9vw
  }
  &:nth-child(4) {
    padding-right:5vw
  }
  &:nth-child(5) {
    padding-right:1vw
  }

`

export interface IPriceInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: Date;
  last_updated: Date;
  quotes: Quotes;
  coco: Function;
}

export interface Quotes {
  USD: Usd;
}

export interface Usd {
  price: number;
  volume_24h: number;
  volume_24h_change_24h: number;
  market_cap: number;
  market_cap_change_24h: number;
  percent_change_15m: number;
  percent_change_30m: number;
  percent_change_1h: number;
  percent_change_6h: number;
  percent_change_12h: number;
  percent_change_24h: number;
  percent_change_7d: number;
  percent_change_30d: number;
  percent_change_1y: number;
  ath_price: number;
  ath_date: Date;
  percent_from_price_ath: number;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);


  return (
    <Container>
      <Helmet>
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
        <button onClick={toggleDarkAtom}>Toggle Mode</button>
      </Header>
      {isLoading ? (
        <Loader>"Loading ... "</Loader>
      ) : (
        <CoinsList>
          <BoxHeader>
            <HeaderName>코인명</HeaderName>
            <HeaderName>24시간 대비</HeaderName>
            <HeaderName>거래 대금</HeaderName>
            <HeaderName>시가총액</HeaderName>
            <HeaderName>현재가</HeaderName>
          </BoxHeader>
          {data?.slice(0, 10).map((coin) => (
            <Coin key={coin.id}>
            
              
              <Box>
                <Link
                  to={`/${coin.id}`}
                  state={{ name: coin.name, rank: coin.rank }}
                >
            
                  <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  />
                  {coin.name}
                  
                </Link>
                <CoinDetail key={coin.id} id={coin.id}></CoinDetail>
              </Box>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
