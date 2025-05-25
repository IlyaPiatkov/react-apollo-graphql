import React from 'react';
import { Routes, Route } from 'react-router';

import { Products } from '@pages/products';
import { Product } from '@pages/product';
import { Category } from '@pages/category';
import { SingIn } from '@pages/sing-in';
import { SingUp } from '@pages/sing-up';
import { UserProvider } from '@shared/user-context';

import { Layout } from './layout';

export const App: React.FC = () => {
    return (
        <UserProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Products />} />
                    <Route path="sing-in" element={<SingIn />} />
                    <Route path="sing-up" element={<SingUp />} />
                    <Route path="category/:categoryId" element={<Category />} />
                    <Route
                        path="category/:categoryId/product/:productId"
                        element={<Product />}
                    />
                </Route>
            </Routes>
        </UserProvider>
    );
};
