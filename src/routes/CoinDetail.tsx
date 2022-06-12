import { useQuery } from "react-query";
import { exchangeRate, fetchCoinTickers } from "../api";
import styled from "styled-components";

export interface IPriceInfoData {
    circulating_supply: number;
    id: string;
    name: string;
    symbol: string;
    rank: number;
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

  export interface Postprops{
      ids:string;
      key:string;
  }

  export interface IExchange {
    date: Date;
    usd:  { [key: string]: number };
}

const DetailList = styled.div`
    display:grid;
    grid-template-columns: repeat(4, 1fr);
    width:83%;

    
`

const Detail = styled.div`

 
        display:flex;
        justify-content: end;

`

const Red = styled.span`
    color:red;

`

const Blud = styled.span`
    color:blue;
`

function CoinDetail(props:any){
    const coinId = props.id
    const { isLoading: tickersLoading, data: tickersData } =
    useQuery<IPriceInfoData>(
      ["tickers", coinId],
      () => fetchCoinTickers(coinId),
      {
        refetchInterval: 100000,
      }
 
    );

    const {isLoading: exLoading, data: exData} = useQuery<IExchange>(
        ["exchange"],
        () => exchangeRate(),
    );    
        //console.log(exData?.usd.krw)
    let price : Number  = 0
    let exchange  : Number = 0
    let volume : Number = 0  
    let marketCap : Number = 0
    if(!tickersLoading){
         price = tickersData!.quotes.USD.price
         volume = tickersData!.quotes.USD.volume_24h
         marketCap = tickersData!.quotes.USD.market_cap
        
    }
    if(!exLoading){
         exchange = exData!.usd.krw
    }


    return(
        <>
            {tickersLoading  ? 
                <span>loding...</span>
                : <>
                    <DetailList>
                        <Detail> {tickersData!.quotes.USD.percent_change_24h > 0 ? <Red>▲ {tickersData!.quotes.USD.percent_change_24h}%</Red> : <Blud>▼ {tickersData!.quotes.USD.percent_change_24h}%</Blud> }</Detail>
                        <Detail> {(+volume * +exchange).toLocaleString().split(".")[0]} 원</Detail>
                        <Detail> {(+marketCap * +exchange).toLocaleString().split(",")[0]} 조원</Detail>  
                        <Detail> {(+price * +exchange).toLocaleString().split(".")[0]} 원 </Detail>
                    </DetailList>
                </>
                
                }
       
      
        </>
    )
}

export default CoinDetail