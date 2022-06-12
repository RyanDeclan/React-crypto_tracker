import { useParams } from "react-router";
import styled from "styled-components";
import {queryClient} from "../index";

export interface IPriceInfoDatas {
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

const List = styled.div`
 
`
const Percent = styled.div`
  color: red;
  display : flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-radius:10px;
  margin-bottom: 1vh;
  padding: 0 2vw;
  height: 4vh;

`
const Name = styled.div`
  
`
const Number = styled.div`
`



function Price() {
  const { coinId } = useParams() as { coinId: string };
  const data: IPriceInfoDatas | undefined =  queryClient.getQueryData(["tickers",`${coinId}`])
  return (
  <>
    <List>
      <Percent>
        <Name>7일 전 대비</Name>
        <Number>{data?.quotes.USD.percent_change_7d}</Number>
      </Percent>
      <Percent>
        <Name>30일 전 대비</Name>
        <Number>{data?.quotes.USD.percent_change_30d}</Number>
      </Percent>
      <Percent>
        <Name>1 년 전 대비</Name>
        <Number>{data?.quotes.USD.percent_change_1y}</Number>
      </Percent>
    </List>
  </>
  );
}

export default Price;
