import { useSelector } from 'react-redux';
import Logout from 'components/Logout';
import { State } from '../../../module';
import LoginFormModal from 'components/LoginFormModal';
import SignupFormModal from 'components/SignupFormModal';
import { Link } from 'react-router-dom';
import { Stack, Box, Tabs, Tab } from '@mui/material';
import DemoButton from 'components/Demo';
import * as React from 'react';

function Navigation() {
  const sessionUser = useSelector((state: State) => state.session.user);
  const [value, setValue] = React.useState(0);


  const handleChange = (_event: any, newValue: number) => {
    setValue(newValue);
  };

  const tabsRef = React.useRef<HTMLButtonElement>(null);
  const tabRef = React.useRef<HTMLAnchorElement>(null);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <Stack direction='row' >
        <Box sx={{ width: '100%' }}>
          <Tabs ref={tabsRef} value={value} onChange={handleChange} aria-label="navigation">
            <Tab ref={tabRef} value={0} label="Watchlist" to="/" component={Link} />
            <Tab ref={tabRef} value={1} label="Cryptocurrencies" to="/cryptocurrencies" component={Link} />
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
