import { useState, useEffect, createContext, useContext } from 'react';
import { fetchSections, fetchPosts } from '../query/queries';

const SanityContentContext = createContext(null);

export function SanityContentProvider({ lang, children }) {
  const [posts, setPosts] = useState([]);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchSections(lang), fetchPosts(lang)])
      .then(([sections, posts]) => {
        setSections(sections);
        setPosts(posts);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [lang]);

  return (
    <SanityContentContext.Provider
      value={{ posts, sections, loading, error, lang }}
    >
      {children}
    </SanityContentContext.Provider>
  );
}

export function useSanityContent() {
  const context = useContext(SanityContentContext);
  if (!context) {
    throw new Error(
      'useSanityContent must be used within SanityContentProvider',
    );
  }
  return context;
}
