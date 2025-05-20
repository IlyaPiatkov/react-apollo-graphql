import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { useProducts } from './hooks/use-products';

export const Products: React.FC = () => {
    const { data, loading } = useProducts();

    if (loading) {
        return (
            <Grid container={true} spacing={2}>
                {Array.from({ length: 18 }).map((_, index) => (
                    <Card key={index} sx={{ width: 276 }}>
                        <Skeleton variant="rectangular" height={140} />
                        <CardContent>
                            <Skeleton variant="text" />
                            <Skeleton variant="text" />
                        </CardContent>
                    </Card>
                ))}
            </Grid>
        );
    }

    return (
        <Grid container={true} spacing={2}>
            {data?.products.map((item) => (
                <Card key={item.id} sx={{ width: 276 }}>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image={item.images[0]}
                            alt={item.title}
                        />
                        <CardContent>
                            <Typography
                                gutterBottom
                                variant="h5"
                                component="div"
                            >
                                {item.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary' }}
                            >
                                {item.description}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                            Share
                        </Button>
                    </CardActions>
                </Card>
            ))}
        </Grid>
    );
};
