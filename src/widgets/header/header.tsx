import React from 'react';
import { useNavigate } from 'react-router';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import { useUserContext } from '@shared/user-context';


export const Header: React.FC = () => {
    const navigate = useNavigate();

    const {user, onSetUser} = useUserContext();

    return (
        <>
            <Container sx={{ p: 2 }}>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography>TODO LIST</Typography>
                    
                    {user ? (
                        <Button
                            onClick={() => onSetUser(null)}
                            variant="outlined"
                        >
                            Logout
                        </Button>
                    ) : (
                        <Stack direction="row" spacing={2}>
                            <Button
                                onClick={() => navigate('/sing-in')}
                                variant="outlined"
                                startIcon={<LoginIcon />}
                            >
                                Sing In
                            </Button>
                            <Button
                                onClick={() => navigate('/sing-up')}
                                variant="contained"
                                startIcon={<LogoutIcon />}
                            >
                                Sing Up
                            </Button>
                        </Stack>
                    )}
                </Stack>
            </Container>
            <Divider />
        </>
    );
};
