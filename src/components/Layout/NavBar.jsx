import React, { useState } from 'react';
import './NavBar.css';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

import LocaleSwitcher from '../LocaleSwitcher/LocaleSwitcher';

import { useParams } from 'react-router-dom';
import { createPathName } from '../../utils/localeUtils';
import { useSanityContent } from '../../context/SanityContentProvider';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
  const theme = useTheme();
  const { lang } = useParams();
  const { sections } = useSanityContent();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar className='app-bar'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters className='toolbar'>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <IconButton sx={{ p: 0 }}>
              <Link href={createPathName(lang, '')}>
                <Avatar alt='Home' src='/favicon.ico' />
              </Link>
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size='large'
              aria-label='menu'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
              color='inherit'
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {sections &&
                sections.map(({ title, slug }) => (
                  <MenuItem key={slug} onClick={handleCloseNavMenu}>
                    <Link
                      className={
                        theme === 'light'
                          ? 'nav-button-collapsed'
                          : 'nav-button-collapsed-dark'
                      }
                      to={`/${lang}/${slug}`}
                    >
                      {title}
                    </Link>
                  </MenuItem>
                ))}
            </Menu>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {sections &&
              sections.map(({ title, slug }) => (
                <MenuItem key={slug} onClick={handleCloseNavMenu}>
                  <Link className='nav-button' to={`/${lang}/${slug}`}>
                    {title}
                  </Link>
                </MenuItem>
              ))}
          </Box>
          <Box sx={{ display: 'flex', mr: 1 }}>
            <LocaleSwitcher currentLocale={lang} />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
