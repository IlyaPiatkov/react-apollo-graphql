import React from 'react';
import { useParams } from 'react-router';

import { useCategories } from '@features/product';

export const Category: React.FC = () => {
    const { categoryId } = useParams();

    const { category } = useCategories({ categoryId });

    console.log('category', category);

    return (
        <div>
            <h1>category {categoryId} </h1>
        </div>
    );
};
