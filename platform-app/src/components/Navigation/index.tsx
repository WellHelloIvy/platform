import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from 'components/Logout';
import { State } from '../../../module';
import LoginFormModal from 'components/LoginFormModal';
import SignupFormModal from 'components/SignupFormModal';


function Navigation(){
  const sessionUser = useSelector((state: State) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <NavLink to="/">Home</NavLink>
        <Logout />
      </>

    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
    <>
        {sessionLinks}
    </>
  );
}

export default Navigation;
