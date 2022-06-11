import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { isDarkAtom } from "./atoms";
import { useRecoilValue } from "recoil";

interface ChartProps {
  coinId: string;
}

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart({ coinId }: ChartProps) {
  const isDark = useRecoilValue(isDarkAtom);
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  console.log(data)
  return (
    <h1>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
   
              data: data?.map((price) => [new Date(price.time_open).getTime(),price.open,price.high,price.low,price.close,]),
            },
          
          ]}
          options={{
            theme: { mode: isDark ? "dark" : "light" },
            chart: {
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "transparent",
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              labels: { show: false },
              axisTicks: { show: false },
              axisBorder: { show: false },
              categories: data?.map((price) => price.time_close.slice(0, 10)),
            },
            plotOptions:{
              candlestick:{
                colors: { upward: "red",downward: "#3C90EB", } as any,
              }
            },
            
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(2)}`,
              },
            },
           
          }}
        />
      )}
    </h1>
  );
}

export default Chart;
