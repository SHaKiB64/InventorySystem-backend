export declare class AdminDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    filename: string;
    isActive: boolean;
}
export declare class loginDTO {
    email: string;
    password: string;
}
export declare class AdminUpdateDTO {
    name?: string;
    email: string;
    password?: string;
    phone?: string;
}
export declare class CustomerDTO {
    name: string;
    email: string;
    password: string;
    phone: string;
    filename: string;
}
export declare class CutomerUpdateDTO {
    name?: string;
    email: string;
    password?: string;
    phone?: string;
}
export declare class CategoryDTO {
    name: string;
}
export declare class CategoryUpdateDTO {
    name: string;
}
export declare class ProductDTO {
    name: string;
    purprice: number;
    sellprice: number;
    ctg: string;
    qty: number;
    filename: string;
}
export declare class OrderDTO {
    customerId: number;
    products: ProductDTO[];
    totalAmount: number;
}
