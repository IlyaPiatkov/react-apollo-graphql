
export type List = {
    id: string;
    title: string;
}

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

export type Category = {
    id: string;
    name: string;
    slug: string;
    image: string;
    creationAt: string;
    updatedAt: string;
    products: string[];
}