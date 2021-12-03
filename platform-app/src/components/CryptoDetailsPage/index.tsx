import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoTicker, getCandleSticks } from "store/cryptodetails";
import { Paper } from "@mui/material";
import { State, Ticker } from "../../../module";
import PriceChart from "components/PriceChart";

function CryptoDetailsPage() {
  const params = useParams()
  const cryptoId = params?.cryptoId
  const dispatch:any = useDispatch()
  const [yesterdaysClosingPrice, setYesterdaysClosingPrice] = useState(0)

  const cryptoDetails = useSelector((state:State) => state.cryptodetails)

  const ticker:Ticker = cryptoDetails?.ticker

  let endTime = new Date().toISOString();
  let startTime = new Date(Date.now() - 86400000).toISOString();

  useEffect(() => {
      dispatch(getCryptoTicker(`${cryptoId}`))
      dispatch(getCandleSticks(`${cryptoId}`,`${startTime}`,`${endTime}`))
      .then((yesterdaysClosingPrice:any) => {setYesterdaysClosingPrice(yesterdaysClosingPrice)})
    },[dispatch]);

  const calculatePercentageChange = () => {
    const currentPrice:any = ticker?.price
    const percentageChange = ((currentPrice - yesterdaysClosingPrice)/yesterdaysClosingPrice * 100);
    return percentageChange.toFixed(2)
  }

    return(
      <Paper variant="outlined" >
        <hgroup >
          <h1>{cryptoId}</h1>
          <h2>insert name here</h2>
        </hgroup>
        <PriceChart />
        <ul>
          <li>{`Price: $${ticker?.price}`}</li>
          <li>{`% Change: ${calculatePercentageChange()}`}</li>
        </ul>
      </Paper>
    )
}

export default CryptoDetailsPage;
