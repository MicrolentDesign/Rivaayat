import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { CollectionPage } from '@/pages/CollectionPage';
import { ProductPage } from '@/pages/ProductPage';
import { AtelierPage } from '@/pages/AtelierPage';
import { JournalPage } from '@/pages/JournalPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { CustomOrdersPage } from '@/pages/CustomOrdersPage';
import { CustomFitPage } from '@/pages/CustomFitPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { PlaceholderPage, PLANNED_PATHS } from '@/pages/PlaceholderPage';

/* React Router needs the deploy sub-path too, or every in-app link resolves
   against the domain root. Vite's BASE_URL carries a trailing slash and the
   router wants it without one. */
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop/:slug', element: <CollectionPage /> },
      { path: 'product/:slug', element: <ProductPage /> },
      { path: 'atelier', element: <AtelierPage /> },
      { path: 'journal', element: <JournalPage /> },
      { path: 'wishlist', element: <WishlistPage /> },
      { path: 'custom', element: <CustomOrdersPage /> },
      { path: 'custom/:slug', element: <CustomFitPage /> },
      /* Settled information architecture, unwritten content. Listed
         explicitly so a genuine typo still reaches the 404. */
      ...PLANNED_PATHS.map((path) => ({ path: path.slice(1), element: <PlaceholderPage /> })),
      { path: '*', element: <NotFoundPage /> },
    ],
  },
], { basename });
