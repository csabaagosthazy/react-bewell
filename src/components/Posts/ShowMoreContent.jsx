import React, { useState } from 'react';
import { Button, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

import { useSanityContent } from '../../context/SanityContentProvider';

const labels = {
  hu: { showMore: 'Mutass többet', showLess: 'Mutass kevesebbet' },
  en: { showMore: 'Show More', showLess: 'Show Less' },
  de: { showMore: 'Mehr anzeigen', showLess: 'Weniger anzeigen' },
};

export default function ShowMoreContent({ extraContent }) {
  const [showExtra, setShowExtra] = useState(false);
  const { lang } = useSanityContent();
  const currentLabels = labels[lang] || labels.hu;

  return (
    <div className='extra-section'>
      <Button
        onClick={() => setShowExtra(!showExtra)}
        variant='contained'
        fullWidth={false}
        sx={{
          minWidth: '220px',
          backgroundColor: '#A65E2E',
          color: '#F5E9E1',
          '&:hover': {
            backgroundColor: '#8C5027',
          },
        }}
        endIcon={showExtra ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {showExtra ? currentLabels.showLess : currentLabels.showMore}
      </Button>

      <Collapse in={showExtra}>
        <div style={{ marginTop: '8px' }}>{extraContent}</div>
      </Collapse>
    </div>
  );
}
