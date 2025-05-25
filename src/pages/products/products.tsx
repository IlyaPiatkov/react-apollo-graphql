import React from 'react';

import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { useInfiniteScroll } from '@shared/infinite-scroll';
import { useCategories, useProducts } from '@features/product';

import { WIDTH_CATEGORY_CARD, WIDTH_PRODUCT_CARD } from './constants';
import { Skeletons } from './components/skeletons';
import { ProductCard } from './components/product-card';
import { CategoryCard } from './components/category-card';
import { Filters } from './components/filters';

export const Products: React.FC = () => {
    const { products, loading, onLoadMore, onFilter } = useProducts();

    const { categories } = useCategories();

    console.log('categories', categories);

    const targetRef = useInfiniteScroll({
        loading,
        onLoadMore,
        rootMargin: 200,
    });

    return (
        <Grid container={true} spacing={2}>
            <Grid
                container={true}
                size={12}
                direction="column"
                sx={{ overflowX: 'scroll', paddingBottom: '10px' }}
            >
                <Typography variant="h5">Categories</Typography>

                <Stack direction="row" spacing={2}>
                    {categories ? (
                        categories.map((item) => <CategoryCard key={item.id} item={item} />)
                    ) : (
                        <Skeletons
                            itemCount={5}
                            widthCard={WIDTH_CATEGORY_CARD}
                        />
                    )}
                </Stack>
            </Grid>
            <Grid container={true} size={3} direction="column">
                <Typography variant="h5">Filters</Typography>
                <Filters onFilter={onFilter} categories={categories} loading={loading}/>
            </Grid>
            <Grid container={true} size={9} direction="column">
                <Typography variant="h5">Products</Typography>
                <Grid container={true} spacing={2}>
                    {products ? (
                        products.map((item) => (
                            <ProductCard key={item.id} item={item} />
                        ))
                    ) : (
                        <Skeletons
                            itemCount={9}
                            widthCard={WIDTH_PRODUCT_CARD}
                        />
                    )}
                </Grid>

                <div ref={targetRef}>
                    {loading && <div>Loading more...</div>}
                </div>
            </Grid>
        </Grid>
    );
};
