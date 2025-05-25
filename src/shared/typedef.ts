
export type User = {
    id: string;
    name: string;
    email: string;
    avatar: string;
}

export type Product = {
    id: string;
    title: string;
    slug: string;
    price: string;
    description: string;
    category: Category;
    images: string[];
    creationAt: string;
    updatedAt: string;
}

export type ProductsParams = {
    limit?: number;
    offset?: number;
    price?: number;
    price_min?: number;
    price_max?: number;
    title?: string;
    categoryId?: number;
    categorySlug?: string;
}

export type ProductParams = {
    id?: string;
}

export type Category = {
    id: string;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
    products: Product[];
}

export type CategoryParams = {
    id?: string;
}