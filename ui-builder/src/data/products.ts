export type Product = {
  name: string;
  price: number;
  image: string;
};

export const products: Product[] = [
  {
    name: 'Wireless Headphones',
    price: 99.99,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=facearea&w=400&h=400&q=80',
  },
  {
    name: 'Smart Watch',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=facearea&w=400&h=400&q=80',
  },
]; 