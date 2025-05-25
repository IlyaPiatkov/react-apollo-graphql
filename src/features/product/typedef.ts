import { ProductsParams } from "@shared/typedef";

export type OnFilter = (params?: ProductsParams) => void;

export type GetCategory = (id: string) => Promise<void>;