import { Author } from "./Author";

export interface Book {
    id: number;
    title: string;
    author: Author;
    price: number;
    cover_image: string;
    genre: string[];
}
