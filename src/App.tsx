/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './hooks/useAuth';
import { CartProvider } from './hooks/useCart';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Menu } from './pages/Menu';
import { Deals } from './pages/Deals';
import { Rewards } from './pages/Rewards';
import { Locations } from './pages/Locations';
import { Generate } from './pages/Generate';
import { Checkout } from './pages/Checkout';
import { About } from './pages/About';
import { ErrorBoundary } from './components/ErrorBoundary';

export default function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="menu" element={<Menu />} />
                <Route path="deals" element={<Deals />} />
                <Route path="rewards" element={<Rewards />} />
                <Route path="locations" element={<Locations />} />
                <Route path="generate" element={<Generate />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="about" element={<About />} />
              </Route>
            </Routes>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
