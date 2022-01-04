import { useSelector } from 'react-redux';
import Logout from 'components/Logout';
import { State } from '../../../module';
import LoginFormModal from 'components/LoginFormModal';
import SignupFormModal from 'components/SignupFormModal';
import { Box, Tabs, Tab } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';
import DemoButton from 'components/Demo';
import React from 'react';

function Navigation() {
  const sessionUser = useSelector((state: State) => state.session.user);
  const [value, setValue] = React.useState(0);


  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <Stack direction='row' >
        <Box sx={{ width: '100%' }}>
          <Tabs value={value} onChange={handleChange} aria-label="navigation">
            <Tab value={0} label="Watchlist" to="/" component={Link} />
            <Tab value={1} label="Cryptocurrencies" to="/cryptocurrencies" component={Link} />
          </Tabs>
        </Box>
        <Logout />
      </Stack>
    );
  } else {
    sessionLinks = (
      <Stack direction='row' spacing={2} style={{ justifyContent: 'flex-end' }}>
        <LoginFormModal />
        <SignupFormModal />
        <DemoButton />
      </Stack>
    );
  }

  return (
    <nav className='container'>
      {sessionLinks}
    </nav>
  );
}

export default Navigation;
