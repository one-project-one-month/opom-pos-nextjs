export type ModalTypes =
  | 'order-details'
  | 'payment'
  | 'success'
  | 'error'
  | null;

export type Category = {
  id: string;
  name: string;
};

export type Brand = {
  id: string;
  name: string;
};

export type Customer = {
  id: string;
  name: string;
};
