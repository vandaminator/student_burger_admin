export interface Product {
  id: string;
  image: string;
  price: number;
  title: string;
  quantity: number;
  avaliableQty: number;
}

export interface Orders {
  id: number;
  user: number;
  products: Product[];
  delivered: boolean;
  isDone: boolean;
  price: number;
  created_at: string;
}
