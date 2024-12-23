import React, { useState } from 'react';
import { Menu, MenuItem, IconButton, Typography, AppBar, Toolbar, Switch } from '@mui/material';


type NavbarProps = {
  onLogout: () => void;
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ onLogout, theme, onThemeToggle }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    onLogout();
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo */}
        <div style={{ flexGrow: 1 }}>
          {/* <img src={logo} alt="Logo" style={{ height: '40px', cursor: 'pointer' }} />  */}
        </div>

        {/* Account Menu */}
        <div>
          {/* <IconButton
            edge="end"
            color="inherit"
            onClick={handleMenuOpen}
          >
            <AccountCircleIcon />
          </IconButton> */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem>
              <Typography variant="body1">
                Theme: {theme === 'light' ? 'Light' : 'Dark'}
              </Typography>
              <Switch
                checked={theme === 'dark'}
                onChange={onThemeToggle}
              />
            </MenuItem>
            <MenuItem onClick={handleLogout}>Log Out</MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};


export default Navbar;
