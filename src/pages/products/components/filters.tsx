import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

import { OnFilter } from '@features/product';
import { Category } from '@shared/typedef';

type Inputs = {
    title: string;
    price: string;
    price_min: string;
    price_max: string;
    categoryId: string;
};

type Props = {
    onFilter: OnFilter;
    categories?: Category[];
    loading: boolean;
};

export const Filters: React.FC<Props> = (props) => {
    const { onFilter, categories, loading } = props;

    const { register, handleSubmit, reset } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = (data) => {
        onFilter({
            ...data,
            title: data.title ? data.title.trim() : undefined,
            price: data.price ? Number(data.price) : undefined,
            price_min: data.price_min ? Number(data.price_min) : undefined,
            price_max: data.price_max ? Number(data.price_max) : undefined,
            categoryId: data.categoryId ? Number(data.categoryId) : undefined,
        });
    };

    const onReset = () => {
        reset();
        onFilter();
    };

    return (
        <Box
            onSubmit={handleSubmit(onSubmit)}
            component="form"
            sx={{ '& > :not(style)': { m: '8px 0' } }}
            noValidate={true}
            autoComplete="off"
        >
            <TextField
                id="title"
                label="Title"
                size="small"
                fullWidth={true}
                {...register('title')}
            />

            <TextField
                id="price"
                label="Price"
                size="small"
                fullWidth={true}
                type="number"
                {...register('price')}
            />

            <Stack direction="row" spacing={2}>
                <TextField
                    id="price_min"
                    label="Price Min"
                    size="small"
                    type="number"
                    {...register('price_min')}
                />

                <TextField
                    id="price_max"
                    label="Price Max"
                    size="small"
                    type="number"
                    {...register('price_max')}
                />
            </Stack>

            <FormControl fullWidth={true} size="small">
                <InputLabel id="categories-label" size="small">
                    Categories
                </InputLabel>
                <Select
                    labelId="categories-label"
                    id="categories-select"
                    size="small"
                    label="Categories"
                    disabled={!categories?.length}
                    {...register('categoryId')}
                >
                    {categories?.map((category) => (
                        <MenuItem key={category.id} value={category.id}>
                            {category.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Stack direction="row" spacing={2}>
                <Button
                    type="submit"
                    variant="contained"
                    size="small"
                    loading={loading}
                    loadingPosition="start"
                >
                    Filter
                </Button>
                <Button onClick={onReset} size="small">
                    Clear Filter
                </Button>
            </Stack>
        </Box>
    );
};
