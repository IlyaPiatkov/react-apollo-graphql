import { gql, useQuery } from "@apollo/client"

import { Product } from "@shared/typedef";


const GET_PRODUCTS = gql`
    query Products(
        $limit: Int
        $offset: Int
    ) {
        products(limit: $limit, offset: $offset) {
            id
            title
            price
            description
            images
            category {
                id
                name
                image
            }
        }
    }
`

export const useProducts = () => {
    const { data, loading, fetchMore } = useQuery<{ products: Product[] }>(GET_PRODUCTS, {
        variables: {
            limit: 18,
            offset: 0
        },
    });

    console.log(data);

    const onChangePage = (page: number) => {
        fetchMore({
            variables: {
                offset: page * 18,
            },
        });
    }


    return {
        data, 
        loading,
        onChangePage
    }
}