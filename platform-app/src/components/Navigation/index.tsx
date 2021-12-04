// import { Link, NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import Logout from 'components/Logout';
// import { State } from '../../../module';
// import LoginFormModal from 'components/LoginFormModal';
// import SignupFormModal from 'components/SignupFormModal';
import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {

  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();

      }}
      {...props}
    />
  );
}

function Navigation(){
  const [value, setValue] = React.useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };



  return (
    <Box sx={{ width: '100%' }}>
      <Tabs value={value} onChange={handleChange} aria-label="navigation">
        <LinkTab label="Watchlist" href="/" />
        <LinkTab label="Cryptocurrencies" href="/cryptocurrencies" />
      </Tabs>
    </Box>
  );
  // const sessionUser = useSelector((state: State) => state.session.user);

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
