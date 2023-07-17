import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import './style/styles.scss'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Favorites from './pages/Favorites';
import SearchCocktails from './pages/SearchCocktails';

const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/search",
    element: <SearchCocktails />,
  },
  {
    path: "/favorites",
    element: <Favorites />,
  }

]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
)
