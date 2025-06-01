import { useRef } from "react";
import { gql, useQuery } from "@apollo/client";

import { ProductsParams } from "@shared/typedef";

import { OnFilter, ProductsQueryResponse } from "../typedef";


export const GET_PRODUCTS = gql`
    query Products(
        $limit: Int
        $offset: Int
        $price: Int
        $price_min: Int
        $price_max: Int
        $title: String
        $categoryId: Float
        $categorySlug: String
    ) {
        products(
            limit: $limit, 
            offset: $offset, 
            price: $price, 
            price_min: $price_min, 
            price_max: $price_max, 
            title: $title, 
            categoryId: $categoryId, 
            categorySlug: $categorySlug
        ) {
            id
            title
            price
            description
            images
            category {
                id
                name
                slug
                image
            }
        }
    }
`;

const ITEMS_PER_PAGE = 9;

export const useProducts = () => {
    const page = useRef<number>(1);

    const { data, loading, fetchMore, updateQuery, refetch } = useQuery<
        ProductsQueryResponse,
        ProductsParams
    >(GET_PRODUCTS, {
        variables: {
            limit: ITEMS_PER_PAGE,
            offset: ITEMS_PER_PAGE
        },
    });

    const onLoadMore = async () => {
        page.current += 1;

        const result = await fetchMore({
            variables: {
                limit: ITEMS_PER_PAGE,
                offset: page.current * ITEMS_PER_PAGE
            },
        });

        updateQuery((prev) => ({
            products: [...prev.products, ...result.data.products]
        }));
    };

    const onFilter: OnFilter = (filterParams) => {
        if (!filterParams) {
            refetch({
                price: undefined,
                price_min: undefined,
                price_max: undefined,
                title: undefined,
                categoryId: undefined,
            });
            return;
        }

        refetch({
            ...filterParams,
            offset: 0,
        });
    };

    return {
        products: data?.products,
        loading,
        onLoadMore,
        onFilter
    };
};