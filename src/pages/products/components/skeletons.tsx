import React from 'react';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

type Props = {
    itemCount: number;
    widthCard: number;
};

export const Skeletons: React.FC<Props> = (props) => {
    return (
        <Grid container={true} spacing={2}>
            {Array.from({ length: props.itemCount }).map((_, index) => (
                <Card key={index} sx={{ width: props.widthCard }}>
                    <Skeleton variant="rectangular" height={140} />
                    <CardContent>
                        <Skeleton variant="text" />
                    </CardContent>
                </Card>
            ))}
        </Grid>
    );
};
