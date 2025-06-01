import { gql, useQuery } from "@apollo/client";

import { Category, CategoryParams } from "@shared/typedef";

import { GetCategory } from "../typedef";


export const GET_CATEGORIES = gql`
    query Categories {
        categories {
            id
            name
            image
        }
    }
`

const GET_CATEGORY = gql`
    query Category($id: ID!) {
        category(id: $id) {
            id
            name
            image
        }
    }
`

type Params = {
    categoryId?: string;
}

export const useCategories = (params?: Params) => {
    const { categoryId } = params || {};

    const categoriesData = useQuery<{ categories: Category[] }>(GET_CATEGORIES);

    const categoryData = useQuery<{ category: Category }, CategoryParams>(GET_CATEGORY, {
        skip: categoryId ? false : true,
        variables: {
            id: categoryId
        },
    });

    const getCategory: GetCategory = async (id) => {
        categoryData.refetch({
            id
        });
    }

    return {
        categories: categoriesData.data?.categories,
        category: categoryData.data?.category,
        getCategory
    }
}