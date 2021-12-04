// import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Logout from 'components/Logout';
import { State } from '../../../module';
import LoginFormModal from 'components/LoginFormModal';
import SignupFormModal from 'components/SignupFormModal';
import * as React from 'react';
import { Box, Tabs, Tab } from '@material-ui/core';
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const sessionUser = useSelector((state: State) => state.session.user);

  const handleChange = (_event: any, newValue: string) => {
    setValue(newValue);
  };

  const location = useLocation();
  const currentTab = location.pathname;
  const [value, setValue] = React.useState(currentTab);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label="navigation">
            <Tab label="Watchlist" to="/" component={Link} />
            <Tab label="Cryptocurrencies" to="/cryptocurrencies" component={Link} />
          </Tabs>
        </Box>
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

  // return (

  // );
  //

  // let sessionLinks;
  // if (sessionUser) {
  //   sessionLinks = (
  //     <>
  //       <NavLink to="/">Home</NavLink>
  //       <Logout />
  //     </>

  //   );
  // } else {
  //   sessionLinks = (
  //     <>
  //       <LoginFormModal />
  //       <SignupFormModal />
  //     </>
  //   );
  // }

  // return (
  //   <>
  //       {sessionLinks}
  //   </>
  // );


}

export default Navigation;
