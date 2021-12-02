import { useEffect } from "react";
import { useParams } from "react-router";
import { useDispatch } from "react-redux";
import { getCryptoDetails } from "store/cryptodetails";

function CryptoDetailsPage() {
  const params = useParams()
  const cryptoId = params?.cryptoId
  const dispatch = useDispatch()

  useEffect(()=> {
      dispatch(getCryptoDetails(`${cryptoId}`))
    },[dispatch]);


  //price chart
  //details


    return(
      <>

        <h1>test</h1>
      </>
    )
}

export default CryptoDetailsPage;
