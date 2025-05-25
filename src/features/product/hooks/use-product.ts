import { gql, useQuery } from "@apollo/client";

import { Product, ProductParams } from "@shared/typedef";


const GET_PRODUCT = gql`
    query Product($id: ID!) {
        product(id: $id) {
            title
            price
            description
            images
            category {
                id
                name
            }
        }
    }
`

type Params = {
    productId?: string;
};

export const useProduct = ({ productId }: Params) => {
    const { data, loading } = useQuery<{ product: Product }, ProductParams>(GET_PRODUCT, {
        variables: {
            id: productId,
        },
    });

    return {
        product: data?.product,
        loading,
    }
}