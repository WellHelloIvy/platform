import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from 'components/Logout';
import { State } from '../../../module';
import LoginFormModal from 'components/LoginFormModal';

function Navigation(){
  const sessionUser = useSelector((state: State) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <Logout />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
        <NavLink to="/">Home</NavLink>
        {sessionLinks}
    </>
  );
}

export default Navigation;
