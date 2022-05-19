export interface IDbContact {
  id?: number;
  parent?: number;
  name: string;
  phone_number: string;
}
export interface IContact {
  id: number;
  name: string;
  phone_number: string;
  children: Array<IContact>;
}
