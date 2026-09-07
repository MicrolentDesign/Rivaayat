import { createBrowserRouter } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { HomePage } from '@/pages/HomePage';
import { CollectionPage } from '@/pages/CollectionPage';
import { ProductPage } from '@/pages/ProductPage';
import { AtelierPage } from '@/pages/AtelierPage';
import { JournalPage } from '@/pages/JournalPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { CustomOrdersPage } from '@/pages/CustomOrdersPage';
import { NotFoundPage } from '@/pages/NotFoundPage';

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
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
