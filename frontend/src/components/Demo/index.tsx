import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function DemoButton() {

  const dispatch = useDispatch()



  const handleDemo =() => {
      const demoObj = {
    email: 'demo@user.com',
    password: 'abc123'
    }

    return dispatch(sessionActions.login(demoObj))
  }

  return(
    <Button variant="contained" color='primary' onClick={handleDemo}>DEMO</Button>
  )
}
export default DemoButton;
