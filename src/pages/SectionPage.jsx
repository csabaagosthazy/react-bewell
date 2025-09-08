import React from 'react';
import { useSanityContent } from '../context/SanityContentProvider';
import { useParams, Navigate } from 'react-router-dom';
import PostContent from '../components/Posts/PostContent';

import Box from '@mui/material/Box';

export default function SectionPage() {
  const { posts, loading, error } = useSanityContent();
  const { sectionId, lang } = useParams();
  const filteredPosts = posts.filter((post) => post.sectionSlug === sectionId);
  if (filteredPosts.length === 0 && !loading && !error) {
    return <Navigate to={`/${lang}`} replace />;
  }

  return (
    <>
      {filteredPosts.map((post) => (
        <Box key={post.id} sx={{ display: 'flex', justifyContent: 'center' }}>
          <PostContent post={post} />
        </Box>
      ))}
    </>
  );
}
