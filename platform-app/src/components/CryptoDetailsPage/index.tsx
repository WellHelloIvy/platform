import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoTicker, getCandleSticks } from "store/cryptodetails";
import { Paper } from "@mui/material";
import { State, Ticker } from "../../../module";
import PriceChart from "components/PriceChart";

function CryptoDetailsPage() {
  const params = useParams()
  const cryptoId = params?.cryptoId
  const dispatch = useDispatch()

  const cryptoDetails = useSelector((state:State) => state.cryptodetails)

  const ticker:Ticker = cryptoDetails?.ticker

  let endTime = new Date().toISOString();
  let startTime = new Date(Date.now() - 86400000).toISOString();


  useEffect(()=> {
      dispatch(getCryptoTicker(`${cryptoId}`))
      dispatch(getCandleSticks(`${cryptoId}`,`${startTime}`,`${endTime}`))
    },[dispatch]);


  //price chart
  //details


    return(
      <Paper variant="outlined" >
        <hgroup >
          <h1>{cryptoId}</h1>
          <h2>insert name here</h2>
        </hgroup>
        <PriceChart />
        <ul>
          <li>{`Price: $${ticker?.price}`}</li>
        </ul>
      </Paper>
    )
}

export default CryptoDetailsPage;
