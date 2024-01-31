export interface Book {
    id: string;
    image: string;
    title: string;
    author: string;
    price: number;
    quantity: number;
    description: string;
    category: string[];
    year: number;
    rating: Rating[];
}

export interface Rating {
    username: string;
    score: number;
}