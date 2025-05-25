import React from 'react';
import { useNavigate } from 'react-router';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';

import { Category } from '@shared/typedef';

import { WIDTH_CATEGORY_CARD } from '../constants';

type Props = {
    item: Category;
};

export const CategoryCard: React.FC<Props> = (props) => {
    const { item } = props;

    const navigate = useNavigate();

    const onGoToProduct = () => {
        navigate(`/category/${item.id}`);
    };

    return (
        <Card sx={{ width: WIDTH_CATEGORY_CARD }}>
            <CardActionArea onClick={onGoToProduct}>
                <CardMedia
                    component="img"
                    height="140"
                    image={item.image}
                    alt={item.name}
                />
                <CardContent>
                    <Typography variant="body2" component="div">
                        {item.name}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
