import React from 'react';
import { useSanityContent } from '../context/SanityContentProvider';
import PostContent from '../components/Posts/PostContent';
import LoadingPage from './LoadingPage';
import Box from '@mui/material/Box';
import { useParams } from 'react-router-dom';

const getDefaultHomePost = (lang) => {
  const texts = {
    hu: 'Üdvözlöm a légyjólközpont oldalán!',
    en: 'Welcome to the legyjolkozpont website!',
    de: 'Willkommen auf der Website von legyjolkozpont!',
  };
  return [
    {
      body: texts[lang] || texts.hu,
      id: 'edf57e76-d0a6-44ef-bf61-49b855657fef',
      imageAlt: null,
      imageUrl: '/home.jpg',
      publishedAt: '2025-09-05T07:24:07.512Z',
      section: 'Kezdőlap',
      sectionSlug: 'kezdolap',
      textPosition: 'below',
      title: null,
      videoCaption: null,
      videoUrl: null,
    },
  ];
};

export default function HomePage() {
  const { posts, loading, error } = useSanityContent();
  const { lang } = useParams();
  let homePosts = posts.filter((post) => post.sectionSlug === 'kezdolap');
  console.log(homePosts);
  if (homePosts.length === 0 && !loading && !error) {
    homePosts = getDefaultHomePost(lang);
  }

  if (loading) return <LoadingPage />;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      {homePosts.map((post) => (
        <Box key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
          <PostContent post={post} />
        </Box>
      ))}
    </>
  );
}
