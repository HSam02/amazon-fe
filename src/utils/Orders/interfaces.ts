export interface ICreateOrderSchema {
  address: string;
  products: ICreateOrderProductSchema[];
}

export interface ICreateOrderProductSchema {
  productId: number;
  quantity: number;
  price: string;
  color: string;
  size: string;
}
