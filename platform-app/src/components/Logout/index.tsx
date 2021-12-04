import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Button } from '@mui/material';

function Logout(){
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(sessionActions.logout());
  };

  return(
    <Button onClick={logout}>Log Out</Button>
  )
}

export default Logout
