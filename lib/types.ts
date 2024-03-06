export interface NextPageProps {
    params: { [x: string]: string };
    searchParams: Record<string | number | symbol, string | number | undefined>;
}

export interface Cart {
    id: string;
    quantity: number;
}

export interface Favourites {
    id: string;
}
