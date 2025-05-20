import React from 'react';
import { Outlet } from 'react-router';

import Container from '@mui/material/Container';

import { Header } from '@widgets/header';

export const Layout: React.FC = () => {
    return (
        <>
            <Header />

            <Container sx={{ p: 2 }}>
                <Outlet />
            </Container>
        </>
    );
};
