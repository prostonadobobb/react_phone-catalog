/* eslint-disable no-console */
/* eslint-disable no-trailing-spaces */
/* eslint-disable max-len */
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import App from './App';
import { HomePage } from './pages/HomePage/HomePage';
import { PhonePages } from './pages/PhonePages/PhonePages';
import { TabletPages } from './pages/TabletPages/TabletPages';
import { AccessoriesPages } from './pages/AccessoriesPages/AccessoriesPages';
import { Product } from './types/Products';
import { getProducts } from './api/fetchData';

export const Root: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const loadProducts = async () => {
    try {
      const productsFromServer = await getProducts();

      setProducts(productsFromServer);
    } finally {
      console.log('yes');
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>

          <Route index element={<HomePage products={products} />} />

          <Route path="phone">
            <Route index element={<PhonePages products={products} />} />
          </Route>

          <Route path="tablet">
            <Route index element={<TabletPages />} />
          </Route>

          <Route path="accessory">
            <Route index element={<AccessoriesPages />} />
          </Route>

        </Route>
      </Routes>
    </Router>
  );
};
