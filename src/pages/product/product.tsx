import React from 'react';
import { useParams } from 'react-router';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';

import { useProduct } from '@features/product';

export const Product: React.FC = () => {
    const { productId } = useParams();

    const { product, loading } = useProduct({ productId });

    console.log('product', product);

    if (loading) {
        return (
            <Grid container spacing={4}>
                <Grid size={12}>
                    <Skeleton width="100%" height={50}/>
                </Grid>
                <Grid size={5}>
                    <Card>
                        <Skeleton variant="rectangular" height={300} />
                    </Card>
                </Grid>
                <Grid size={7}>
                    <Box>
                        <Box sx={{ mb: 3 }}>
                            <Skeleton width="80%" height={30}/>
                            <Skeleton width="60%" height={30}/>
                        </Box>
                        <Divider sx={{ my: 2 }} />
                        <Skeleton
                            variant="rounded"
                            width={100}
                            height={32}
                        />
                        <Skeleton width={80} height={40} />
                    </Box>
                </Grid>
            </Grid>
        );
    }

    if (!product) {
        return (
            <Container sx={{ textAlign: 'center' }}>
                <Typography variant="h5">Product not found</Typography>
            </Container>
        );
    }

    return (
        <Grid container={true} spacing={4}>
            <Grid size={12}>
                <Typography variant="h4">{product.title}</Typography>
            </Grid>
            <Grid size={5}>
                <Card>
                    <CardMedia
                        component="img"
                        image={product.images[0]}
                        alt={product.title}
                        sx={{
                            objectFit: 'contain',
                        }}
                    />
                </Card>
            </Grid>
            <Grid size={7}>
                <Box>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        sx={{ mb: 3 }}
                    >
                        {product.description}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Chip
                        label={product.category.name}
                        color="primary"
                        sx={{ mb: 2 }}
                    />

                    <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                        ${product.price}
                    </Typography>
                </Box>
            </Grid>
        </Grid>
    );
};
