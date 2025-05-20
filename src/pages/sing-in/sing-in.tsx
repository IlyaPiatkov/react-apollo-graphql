import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import Typography from '@mui/material/Typography';

import { useAuth } from '@features/auth';

type Inputs = {
    email: string;
    password: string;
};

export const SingIn: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState } = useForm<Inputs>();

    const {onSingIn} = useAuth();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);

        onSingIn({
            email: data.email,
            password: data.password,
        })
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    return (
        <>
            <Typography variant="h4">Sing In</Typography>

            <Box
                onSubmit={handleSubmit(onSubmit)}
                component="form"
                sx={{ '& > :not(style)': { m: '8px 0' }, maxWidth: '500px' }}
                noValidate={true}
                autoComplete="off"
            >
                <FormControl fullWidth={true} variant="outlined">
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <OutlinedInput
                        id="email"
                        type="email"
                        label="Email"
                        {...register('email', { required: true })}
                    />
                    {formState.errors.email && (
                        <FormHelperText error={true}>
                            This field is required
                        </FormHelperText>
                    )}
                </FormControl>
                <FormControl fullWidth={true} variant="outlined">
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <OutlinedInput
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label={
                                        showPassword
                                            ? 'hide the password'
                                            : 'display the password'
                                    }
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"
                        {...register('password', { required: true })}
                    />
                    {formState.errors.password && (
                        <FormHelperText error={true}>
                            This field is required
                        </FormHelperText>
                    )}
                </FormControl>

                <Button type="submit" variant="contained" size="large">
                    Sing In
                </Button>
            </Box>
        </>
    );
};
