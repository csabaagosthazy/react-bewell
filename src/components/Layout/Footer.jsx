import React from 'react';

import './Footer.css';

import Box from '@mui/material/Box';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import { Link } from 'react-router-dom';
import { Stack } from '@mui/material';

import { useLocation } from 'react-router-dom';
import { getLocaleFromPath } from '../../utils/localeUtils';

const dictionary = {
  de: {
    title: 'Kontakt',
    description: '',
    phone: '+36703713313',
    email: 'legyjolkozpont@gmail.com',
    imprint: 'Imprint',
    copyright: '© 2025 legyjolkozpont.hu. Alle Rechte vorbehalten.',
  },
  hu: {
    title: 'Kapcsolat',
    description: '',
    phone: '+36703713313',
    email: 'legyjolkozpont@gmail.com',
    imprint: 'Impresszum',
    copyright: '© 2025 legyjolkozpont.hu. Minden jog fenntartva.',
  },
  en: {
    title: 'Contact',
    description: '',
    phone: '+36703713313',
    email: 'legyjolkozpont@gmail.com',
    imprint: 'Imprint',
    copyright: '© 2025 legyjolkozpont.hu. All rights reserved.',
  },
};

const Label = ({ children, className, ...rest }) => {
  // Filter out any props that shouldn't go to native elements
  return (
    <Box component='span' className={className} {...rest}>
      {children}
    </Box>
  );
};

export default function Footer() {
  const location = useLocation();
  const lang = getLocaleFromPath(location.pathname);

  const getFooterItem = (label) => {
    return dictionary[lang][label];
  };

  return (
    <Box component='footer' className='footer'>
      <Box className='footer-icons'>
        <Stack
          className='footer-stack'
          spacing={{ xs: 1, sm: 1 }}
          direction='row'
        >
          <PhoneIcon className='footer-icon' />
          <Label className='footer-label'>{getFooterItem('phone')}</Label>
        </Stack>
        <Stack
          className='footer-stack'
          spacing={{ xs: 1, sm: 1 }}
          direction='row'
        >
          <EmailIcon className='footer-icon' />
          <Label className='footer-label'>{getFooterItem('email')}</Label>
        </Stack>
        <Stack
          className='footer-stack'
          spacing={{ xs: 1, sm: 1 }}
          direction='row'
        >
          <TextSnippetIcon className='footer-icon' />
          <Link className='footer-link' to={`/${lang}/imprint`}>
            <Label className='footer-label'>{getFooterItem('imprint')}</Label>
          </Link>
        </Stack>
      </Box>
      <Box className='footer-copyright'>
        <Label className='footer-label'>{getFooterItem('copyright')}</Label>
      </Box>
    </Box>
  );
}
