export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  categoryId: string;
  category: string;
  price: number;
  quantity: number;
  minQuantity: number;
  icon: string;
};

export type Movement = {
  id: string;
  productId: string;
  productName: string;
  type: 'entrada' | 'saida';
  quantity: number;
  date: string;
  time: string;
  stockAfter: number;
};
