import { Outlet, useParams, useLocation } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import NavBar from './NavBar';
import Footer from './Footer';
import { SanityContentProvider } from '../../context/SanityContentProvider';
import { AnimatePresence, motion } from 'framer-motion';
import PageWrapper from '../../components/PageWrapper';
import LoadingPage from '../../pages/LoadingPage';

export default function LangLayout() {
  const { lang } = useParams();
  const location = useLocation();
  return (
    <SanityContentProvider lang={lang}>
      <Box
        className='app-container'
        display='flex'
        flexDirection='column'
        minHeight='100vh'
      >
        <motion.nav
          key={`nav-${lang}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <NavBar />
        </motion.nav>
        <Toolbar />
        <LoadingPage />
        <AnimatePresence mode='wait'>
          <Box component='main' flex='1' className='main-content'>
            <PageWrapper key={location.pathname}>
              <Outlet />
            </PageWrapper>
          </Box>
        </AnimatePresence>
        <motion.footer
          key={`footer-${lang}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Footer />
        </motion.footer>
      </Box>
    </SanityContentProvider>
  );
}
