import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  Navigate,
} from 'react-router-dom';

import LangLayout from '../components/Layout/LangLayout';
import HomePage from '../pages/HomePage';
import SectionPage from '../pages/SectionPage';
import Imprint from '../pages/Imprint';
import NotFound from '../pages/NotFound';
import { getInitialLocale } from '../utils/localeUtils';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path=':lang' element={<LangLayout />}>
        <Route index element={<HomePage />} />
        <Route path='imprint' element={<Imprint />} />
        <Route path=':sectionId' element={<SectionPage />} />
      </Route>

      <Route path='/' element={<Navigate to={`/${getInitialLocale()}`} />} />
      <Route path='*' element={<NotFound />} />
    </>,
  ),
);
