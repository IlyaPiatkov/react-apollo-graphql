import { Product, ProductsParams, Category } from "@shared/typedef";

export type OnFilter = (params?: ProductsParams) => void;

export type GetCategory = (id: string) => Promise<void>;

export type ProductQueryResponse = {
    product: Product;
};

export type ProductsQueryResponse = {
    products: Product[];
};

export type CategoriesQueryResponse = {
    categories: Category[];
};

export type ProductQueryVariables = {
    id: string;
};
