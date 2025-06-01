import React from 'react';
import { useNavigate } from 'react-router';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActionArea from '@mui/material/CardActionArea';
import CardActions from '@mui/material/CardActions';

import { Product } from '@shared/typedef';

import { WIDTH_PRODUCT_CARD } from '../constants';

type Props = {
    item: Product;
};

export const ProductCard: React.FC<Props> = (props) => {
    const { item } = props;

    const navigate = useNavigate();

    const onGoToProduct = () => {
        navigate(`/category/${item.category.id}/product/${item.id}`);
    };

    return (
        <Card sx={{ width: WIDTH_PRODUCT_CARD }}>
            <CardActionArea onClick={onGoToProduct}>
                <CardMedia
                    component="img"
                    height="140"
                    image={item.images[0]}
                    alt={item.title}
                />
                <CardContent>
                    <Typography
                        gutterBottom={true}
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
                <Button size="small" color="primary" onClick={onGoToProduct}>
                    Byu Now {item.price} $
                </Button>
            </CardActions>
        </Card>
    );
};
