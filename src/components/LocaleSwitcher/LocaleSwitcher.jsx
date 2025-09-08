import React, { useState } from 'react';
import './LocaleSwitcher.css';

import { getPathWithLocale } from '../../utils/localeUtils';

import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

export default function LocaleSwitcher({ currentLocale }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const flags = {
    hu: '/hu.png',
    en: '/en.png',
    de: '/de.png',
  };

  const labels = {
    hu: 'HU',
    en: 'EN',
    de: 'DE',
  };

  const handleLanguageChange = (locale) => {
    localStorage.setItem('preferredLang', locale);
    navigate(getPathWithLocale(locale, location));
    setAnchorEl(null);
  };

  return (
    <>
      {/* Main Button */}
      <Button
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ color: 'white', textTransform: 'none' }}
        startIcon={
          <img
            className='flag-icon'
            src={flags[currentLocale]}
            alt={currentLocale}
          />
        }
      >
        {labels[currentLocale]}
      </Button>

      {/* Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {Object.keys(flags).map((locale) => (
          <MenuItem key={locale} onClick={() => handleLanguageChange(locale)}>
            <ListItemIcon>
              <img className='flag-icon' src={flags[locale]} alt={locale} />
            </ListItemIcon>
            <ListItemText>{labels[locale]}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
