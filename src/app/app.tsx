import React from 'react';
import { Routes, Route } from 'react-router';

import { Dashboard } from '@pages/dashboard';
import { Home } from '@pages/home';
import { SingIn } from '@pages/sing-in';
import { SingUp } from '@pages/sing-up';
import { UserProvider } from '@shared/user-context';

import { Layout } from './layout';

export const App: React.FC = () => {
    return (
        <UserProvider>
            <Routes>
                <Route element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="sing-in" element={<SingIn />} />
                    <Route path="sing-up" element={<SingUp />} />
                    <Route path="dashboard" element={<Dashboard />} />
                </Route>
            </Routes>
        </UserProvider>
    );
};
