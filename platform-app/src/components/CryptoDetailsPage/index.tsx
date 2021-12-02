import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getCryptoDetails } from "store/cryptodetails";
import { Paper } from "@mui/material";
import { State, Ticker } from "../../../module";

function CryptoDetailsPage() {
  const params = useParams()
  const cryptoId = params?.cryptoId
  const dispatch = useDispatch()

  const cryptoDetails = useSelector((state:State) => state.cryptodetails)

  const ticker:Ticker = cryptoDetails?.ticker


  useEffect(()=> {
      dispatch(getCryptoDetails(`${cryptoId}`))
    },[dispatch]);


  //price chart
  //details


    return(
      <Paper>
        <hgroup>
          <h1>{cryptoId}</h1>
          <h2>insert name here</h2>
        </hgroup>
        <ul>
          <li>{`$${ticker.price}`}</li>
        </ul>
      </Paper>
    )
}

export default CryptoDetailsPage;
