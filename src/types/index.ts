export type TPhone = {
  _id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  category: string;
  description: string;
  image: string;
  discount?: number;
  inStock: boolean;
  rating?: number;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type TPhoneData = {
  _id: string;
  brand: string;
  category: string;
  createdAt: string;
  description: string;
  image: string;
  inStock: boolean;
  discount?: number;
  rating?: number;
  model: string;
  price: number;
  quantity: number;
  updatedAt: string;
  year: number;
};

export type TOrder = {
  _id: string;
  status: string;
  totalPrice?: number;
  createdAt: string;
  userEmail: string;
  user: string;
  products: Array<any>;
  transaction: any;
};
