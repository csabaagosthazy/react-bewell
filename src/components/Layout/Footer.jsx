import React from 'react';

import './Footer.css';

import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
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

export default function Footer() {
  const location = useLocation();
  const lang = getLocaleFromPath(location.pathname);

  const getFooterItem = (label) => {
    return dictionary[lang][label];
  };

  return (
    <Box>
      <BottomNavigation className='footer'>
        <Box className='footer-icons'>
          <Stack
            className='footer-stack'
            spacing={{ xs: 1, sm: 1 }}
            direction='row'
          >
            <PhoneIcon className='footer-icon' />
            <span className='footer-label'>{getFooterItem('phone')}</span>
          </Stack>
          <Stack
            className='footer-stack'
            spacing={{ xs: 1, sm: 1 }}
            direction='row'
          >
            <EmailIcon className='footer-icon' />
            <span className='footer-label'>{getFooterItem('email')}</span>
          </Stack>
          <Stack
            className='footer-stack'
            spacing={{ xs: 1, sm: 1 }}
            direction='row'
          >
            <TextSnippetIcon className='footer-icon' />
            <Link className='footer-link' to={`/${lang}/imprint`}>
              <span className='footer-label'>{getFooterItem('imprint')}</span>
            </Link>
          </Stack>
        </Box>
        <Box className='footer-copyright'>
          <span className='footer-label'>{getFooterItem('copyright')}</span>
        </Box>
      </BottomNavigation>
    </Box>
  );
}
