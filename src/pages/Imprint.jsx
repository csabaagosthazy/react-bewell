import React from 'react';
import { useSanityContent } from '../context/SanityContentProvider';
import PostContent from '../components/Posts/PostContent';
import LoadingPage from './LoadingPage';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

const getDefaultImprintPost = (lang) => {
  const titlesAndTexts = {
    disclamerTitle: {
      hu: 'Impresszum és jogi vonatkozások a legyjolkozpont.hu weboldalon',
      en: 'Imprint and Legal Disclaimer of legyjolkozpont.hu website',
      de: 'Impressum und rechtliche Hinweise der Website legyjolkozpont.hu',
    },
    disclaimerText: {
      hu: `Örülök, hogy meglátogat. Kérem, vegye figyelembe a következőket. A weboldal felelős üzemeltetője Kozma Magdolna 8220 Balatonalmádi. Adószám: 90136188-1-39. A weboldal tisztán magánjellegű tájékoztatást nyújt, nem "sajtó- vagy
                  médiaszolgáltató".`,
      en: `I am glad you visited. Please note the following. The person responsible for the operation of the website is Magdolna Kozma, 8220 Balatonalmádi. Tax number: 90136188-1-39. The website provides purely private information and is not a "press or media service provider".`,
      de: `Diese Website präsentiert die Gesundheitsdienstleistungen des Gesundheitszentrums "légyjólközpont". Die Informationen auf der Website dienen nur zu Informationszwecken und ersetzen nicht die professionelle medizinische Beratung, Diagnose oder Behandlung. Der Inhalt der Website stellt keine medizinische Beratung dar und sollte nicht als Grundlage für medizinische Entscheidungen verwendet werden.`,
    },
    copyrightTitle: {
      hu: 'Szerzői jog',
      en: 'Copyright',
      de: 'Urheberrecht',
    },
    copyrightText: {
      hu: `A weboldal tartalma szerzői jogvédelem alatt áll. A tartalom másolása, terjesztése vagy módosítása csak a szerző előzetes írásbeli engedélyével lehetséges.`,
      en: `The content of the website is protected by copyright. Copying, distributing, or modifying the content is only possible with the prior written consent of the author.`,
      de: `Der Inhalt der Website ist urheberrechtlich geschützt. Eine Kopie, Verbreitung oder Änderung des Inhalts ist nur mit vorheriger schriftlicher Genehmigung des Autors möglich.`,
    },
  };

  return [
    {
      body:
        titlesAndTexts.disclaimerText[lang] || titlesAndTexts.disclaimerText.hu,
      id: 'edf57e76-d0a6-44ef-bf61-49b855657fef',
      imageAlt: null,
      imageUrl: null,
      publishedAt: '2025-09-05T07:24:07.512Z',
      section: 'Kezdőlap',
      sectionSlug: 'kezdolap',
      textPosition: 'below',
      title:
        titlesAndTexts.disclamerTitle[lang] || titlesAndTexts.disclamerTitle.hu,
      videoCaption: null,
      videoUrl: null,
    },
    {
      body:
        titlesAndTexts.copyrightText[lang] || titlesAndTexts.copyrightText.hu,
      id: 'edf57e76-d0a6-44ef-bf61-49b855657fez',
      imageAlt: null,
      imageUrl: null,
      publishedAt: '2025-09-05T07:24:07.512Z',
      section: 'Kezdőlap',
      sectionSlug: 'kezdolap',
      textPosition: 'below',
      title:
        titlesAndTexts.copyrightTitle[lang] || titlesAndTexts.copyrightTitle.hu,
      videoCaption: null,
      videoUrl: null,
    },
  ];
};

export default function Imprint() {
  const { posts, loading, error } = useSanityContent();
  const { lang } = useParams();
  let imprintPosts = posts.filter((post) => post.sectionSlug === 'impresszum');
  if (imprintPosts.length === 0 && !loading && !error) {
    imprintPosts = getDefaultImprintPost(lang);
  }

  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      {imprintPosts.map((post) => (
        <Box key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
          <PostContent post={post} />
        </Box>
      ))}
    </>
  );
}
