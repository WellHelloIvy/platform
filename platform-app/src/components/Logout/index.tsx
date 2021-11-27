import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function Logout(){
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(sessionActions.logout());
  };

  return(
    <button onClick={logout}>Log Out</button>
  )
}

export default Logout
