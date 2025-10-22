
export interface Product {
  id: string;
  name: string;
  sku: string;
  category: string;
  stock: number;
  price: number;
}

export interface Customer {
  id: string;
  name: string;
  type: 'Cửa hàng kim khí' | 'Nhà máy' | 'Điện nước';
  contactPerson: string;
  email: string;
  phone: string;
  debt: number;
}

export interface Supplier {
  id:string;
  name: string;
  region: 'Miền Nam' | 'Miền Bắc' | 'Trung Quốc';
  contact: string;
  product_groups: number;
}

export interface Order {
    id: string;
    customerName: string;
    date: string;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    total: number;
}

export type DataRecord = Product | Customer | Supplier | Order;

export interface ColumnDefinition<T> {
  accessor: keyof T;
  header: string;
  render?: (record: T) => React.ReactNode;
}
